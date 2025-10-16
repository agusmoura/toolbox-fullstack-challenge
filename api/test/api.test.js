require('dotenv').config();

const { expect } = require('chai');
const http = require('http');
const createServer = require('../src/server');
const { parseCSV, parseLine, isValidHex, processFiles } = require('../src/utils/csvParser');

process.env.EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || 'https://echo-serv.tbxnet.com';
process.env.API_KEY = process.env.API_KEY || 'Bearer aSuperSecretKey';

const makeRequest = (app, path, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const port = server.address().port;
      http.get(`http://localhost:${port}${path}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          server.close();
          resolve({ statusCode: res.statusCode, headers: res.headers, data });
        });
      }).on('error', (err) => {
        server.close();
        reject(err);
      });
    });
    setTimeout(() => reject(new Error('Test timeout')), timeout);
  });
};

describe('CSV Parser Unit Tests', () => {
  describe('isValidHex()', () => {
    it('should validate correct 32-character hex string', () => {
      const validHex = '70ad29aacf0b690b0467fe2b2767f765';
      expect(isValidHex(validHex)).to.be.true;
    });

    it('should reject hex string with wrong length', () => {
      const invalidHex = '70ad29aacf0b690b';
      expect(isValidHex(invalidHex)).to.be.false;
    });

    it('should reject non-hex characters', () => {
      const invalidHex = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxzzzz';
      expect(isValidHex(invalidHex)).to.be.false;
    });

    it('should reject null or undefined', () => {
      expect(isValidHex(null)).to.be.false;
      expect(isValidHex(undefined)).to.be.false;
    });
  });

  describe('parseLine()', () => {
    it('should parse valid CSV line correctly', () => {
      const line = 'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765';
      const result = parseLine(line);

      expect(result).to.not.be.null;
      expect(result).to.have.property('text', 'RgTya');
      expect(result).to.have.property('number', 64075909);
      expect(result).to.have.property('hex', '70ad29aacf0b690b0467fe2b2767f765');
    });

    it('should return null for line with missing fields', () => {
      const line = 'file1.csv,RgTya,64075909';
      const result = parseLine(line);
      expect(result).to.be.null;
    });

    it('should return null for line with too many fields', () => {
      const line = 'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765,extra';
      const result = parseLine(line);
      expect(result).to.be.null;
    });

    it('should return null for line with invalid number', () => {
      const line = 'file1.csv,RgTya,notanumber,70ad29aacf0b690b0467fe2b2767f765';
      const result = parseLine(line);
      expect(result).to.be.null;
    });

    it('should return null for line with invalid hex', () => {
      const line = 'file1.csv,RgTya,64075909,invalidhex';
      const result = parseLine(line);
      expect(result).to.be.null;
    });

    it('should parse number as integer', () => {
      const line = 'file1.csv,Text,123,70ad29aacf0b690b0467fe2b2767f765';
      const result = parseLine(line);
      expect(result.number).to.be.a('number');
      expect(result.number).to.equal(123);
    });
  });

  describe('parseCSV()', () => {
    it('should parse valid CSV content', () => {
      const csv = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

      const result = parseCSV(csv);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.have.property('text', 'RgTya');
      expect(result[1]).to.have.property('text', 'AtjW');
    });

    it('should filter out invalid lines', () => {
      const csv = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,InvalidLine
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

      const result = parseCSV(csv);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });

    it('should return empty array for empty CSV', () => {
      const csv = `file,text,number,hex`;
      const result = parseCSV(csv);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });

    it('should handle CSV with only header', () => {
      const csv = `file,text,number,hex
`;
      const result = parseCSV(csv);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });
  });

  describe('processFiles()', () => {
    it('should process multiple files correctly', () => {
      const files = [
        {
          filename: 'file1.csv',
          content: `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765`
        },
        {
          filename: 'file2.csv',
          content: `file,text,number,hex
file2.csv,TestText,123,70ad29aacf0b690b0467fe2b2767f765`
        }
      ];

      const result = processFiles(files);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.have.property('file', 'file1.csv');
      expect(result[0]).to.have.property('lines');
      expect(result[0].lines).to.be.an('array');
    });

    it('should include files with empty lines array', () => {
      const files = [
        {
          filename: 'empty.csv',
          content: `file,text,number,hex`
        }
      ];

      const result = processFiles(files);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.have.property('file', 'empty.csv');
      expect(result[0].lines).to.be.an('array');
      expect(result[0].lines).to.have.lengthOf(0);
    });
  });
});

describe('Express Server Tests', () => {
  let app;

  before(() => {
    app = createServer();
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const { statusCode, data } = await makeRequest(app, '/');
      expect(statusCode).to.equal(200);
      const json = JSON.parse(data);
      expect(json).to.have.property('status', 'running');
    });
  });

  describe('GET /files/data', () => {
    it('should return 200 status code', async function() {
      this.timeout(10000);
      const { statusCode } = await makeRequest(app, '/files/data');
      expect(statusCode).to.equal(200);
    });

    it('should return JSON content type', async function() {
      this.timeout(10000);
      const { headers } = await makeRequest(app, '/files/data');
      expect(headers['content-type']).to.include('application/json');
    });

    it('should return an array of file objects', async function() {
      this.timeout(10000);
      const { data } = await makeRequest(app, '/files/data');
      const json = JSON.parse(data);
      expect(json).to.be.an('array');
    });

    it('should return correct file structure with file and lines properties', async function() {
      this.timeout(10000);
      const { data } = await makeRequest(app, '/files/data');
      const json = JSON.parse(data);
      if (json.length > 0) {
        expect(json[0]).to.have.property('file');
        expect(json[0]).to.have.property('lines');
        expect(json[0].lines).to.be.an('array');
      }
    });

    it('should have correct line structure with text, number, and hex', async function() {
      this.timeout(10000);
      const { data } = await makeRequest(app, '/files/data');
      const json = JSON.parse(data);
      if (json.length > 0 && json[0].lines.length > 0) {
        const line = json[0].lines[0];
        expect(line).to.have.property('text');
        expect(line).to.have.property('number');
        expect(line).to.have.property('hex');
        expect(line.number).to.be.a('number');
      }
    });

    it('should parse number field as integer not string', async function() {
      this.timeout(10000);
      const { data } = await makeRequest(app, '/files/data');
      const json = JSON.parse(data);
      if (json.length > 0 && json[0].lines.length > 0) {
        const line = json[0].lines[0];
        expect(typeof line.number).to.equal('number');
        expect(Number.isInteger(line.number)).to.be.true;
      }
    });
  });

  describe('GET /files/list (Bonus)', () => {
    it('should return files list', async function() {
      this.timeout(10000);
      const { statusCode, data } = await makeRequest(app, '/files/list');
      expect(statusCode).to.equal(200);
      const json = JSON.parse(data);
      expect(json).to.have.property('files');
      expect(json.files).to.be.an('array');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const { statusCode } = await makeRequest(app, '/unknown');
      expect(statusCode).to.equal(404);
    });
  });
});
