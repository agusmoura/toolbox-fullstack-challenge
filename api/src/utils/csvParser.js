const HEX_LENGTH = 32;
const REQUIRED_FIELDS = 4;
const HEX_REGEX = /^[0-9a-fA-F]{32}$/;

const isValidHex = (hex) => {
  return Boolean(hex && typeof hex === 'string' && hex.length === HEX_LENGTH && HEX_REGEX.test(hex));
};

const parseLine = (line) => {
  if (!line) return null;

  const fields = line.split(',').map(field => field.trim());

  if (fields.length !== REQUIRED_FIELDS) return null;

  const [file, text, number, hex] = fields;

  if (!file || !text || !number || !hex) return null;

  const parsedNumber = parseInt(number, 10);
  if (isNaN(parsedNumber)) return null;

  if (!isValidHex(hex)) return null;

  return { text, number: parsedNumber, hex };
};

const parseCSV = (csvContent) => {
  if (!csvContent || typeof csvContent !== 'string') return [];

  const lines = csvContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length < 2) return [];

  return lines.slice(1)
    .map(parseLine)
    .filter(Boolean);
};

const processFiles = (files) => {
  if (!Array.isArray(files)) return [];

  return files.map(({ filename, content }) => ({
    file: filename,
    lines: parseCSV(content)
  }));
};

module.exports = {
  parseCSV,
  parseLine,
  isValidHex,
  processFiles
};
