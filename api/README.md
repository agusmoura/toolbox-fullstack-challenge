# Toolbox Fullstack Challenge - API Backend

Una API REST construida con Node.js y Express.js que actúa como middleware entre una aplicación frontend y una API externa de CSV. La API obtiene, procesa, valida y formatea archivos CSV en formato JSON.

## Características

- Obtiene archivos CSV desde una API externa con autenticación
- Valida y parsea datos CSV con reglas de validación estrictas
- Filtra líneas de datos inválidas o malformadas
- Retorna respuestas JSON formateadas
- Manejo integral de errores
- Soporte CORS para integración con frontend
- Suite de tests extensiva con Mocha + Chai

## Stack Tecnológico

- **Runtime**: Node.js 14.x
- **Framework**: Express.js 5.1.0
- **Testing**: Mocha + Chai
- **Environment**: dotenv para configuración
- **Lenguaje**: JavaScript ES6+ (Nativo, sin transpiladores)

## Estructura del Proyecto

```
api/
├── src/
│   ├── index.js              # Punto de entrada de la aplicación
│   ├── server.js             # Configuración del servidor Express
│   ├── routes/
│   │   └── files.js          # Endpoints de procesamiento de archivos/CSV
│   ├── services/
│   │   └── externalApi.js    # Integración con API externa
│   └── utils/
│       └── csvParser.js      # Utilidades de parseo y validación CSV
├── test/
│   └── api.test.js           # Suite de tests completa
├── .env                      # Variables de entorno (no en git)
├── .env.example              # Configuración de ejemplo
├── package.json              # Dependencias y scripts del proyecto
└── README.md                 # Este archivo

```

## Instalación

### Prerequisitos

- Node.js 14.x o superior
- npm (viene con Node.js)

### Pasos de Instalación

1. **Clonar o navegar al repositorio**

   ```bash
   cd api
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Copiar el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   El archivo `.env` debe contener:

   ```
   PORT=3000
   EXTERNAL_API_URL=https://echo-serv.tbxnet.com
   API_KEY=Bearer aSuperSecretKey
   ```

## Ejecutar la API

### Modo Producción

```bash
npm start
```

El servidor iniciará en el puerto 3000 (o el puerto especificado en `.env`):

```
Server running on port 3000
API available at http://localhost:3000
```

### Modo Desarrollo (con auto-reload)

```bash
npm run dev
```

Usa nodemon para reiniciar automáticamente el servidor cuando los archivos cambian.

## Ejecutar Tests

Ejecutar la suite de tests con:

```bash
npm test
```

Salida esperada:

```
  CSV Parser Unit Tests
     isValidHex() - validates hex strings
     parseLine() - parses and validates CSV lines
     parseCSV() - processes complete CSV content
     processFiles() - formats multiple files

  Express Server Tests
     GET /files/data - returns formatted data
     GET /files/list - returns file list
     Error handling - handles errors gracefully

  25 passing (3s)
```

## Endpoints de la API

### 1. GET /files/data

Obtiene todos los archivos CSV desde la API externa, los procesa y valida, y retorna datos JSON formateados.

**Request:**

```bash
curl -X GET "http://localhost:3000/files/data" -H "accept: application/json"
```

**Response (200 OK):**

```json
[
  {
    "file": "test2.csv",
    "lines": [
      {
        "text": "ExampleText",
        "number": 463443856,
        "hex": "60efae65f8cda6933daf7cd173463d2f"
      }
    ]
  },
  {
    "file": "test3.csv",
    "lines": [
      {
        "text": "AnotherExample",
        "number": 445,
        "hex": "3ceb00c1b7d4fdea8437c0f267360703"
      }
    ]
  }
]
```

**Headers de Respuesta:**

```
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *
```

**Esquema de Respuesta:**

- Root: Array de objetos de archivo
- Cada objeto de archivo contiene:
  - `file` (string): nombre del archivo
  - `lines` (array): array de objetos de línea válidos
- Cada objeto de línea contiene:
  - `text` (string): valor de texto del CSV
  - `number` (integer): valor numérico del CSV
  - `hex` (string): string hexadecimal de 32 caracteres

**Respuestas de Error:**

- `503 Service Unavailable` - API externa no alcanzable

  ```json
  {
    "error": "Service temporarily unavailable",
    "message": "Unable to fetch data from external API"
  }
  ```

- `500 Internal Server Error` - Problema de configuración del servidor
  ```json
  {
    "error": "Server configuration error",
    "message": "External API URL or API key not configured"
  }
  ```

### 2. GET /files/list (Característica Bonus)

Retorna la lista raw de archivos disponibles desde la API externa.

**Request:**

```bash
curl -X GET "http://localhost:3000/files/list" -H "accept: application/json"
```

**Response (200 OK):**

```json
{
  "files": ["test1.csv", "test2.csv", "test3.csv"]
}
```

### 3. GET /

Endpoint de health check e información de la API.

**Request:**

```bash
curl -X GET "http://localhost:3000/"
```

**Response (200 OK):**

```json
{
  "message": "Toolbox Fullstack Challenge API",
  "status": "running",
  "endpoints": {
    "files_data": "/files/data",
    "files_list": "/files/list"
  }
}
```

## Reglas de Validación de Datos CSV

La API aplica validación estricta para asegurar la calidad de los datos:

### Formato CSV Válido

```csv
file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5
```

### Reglas de Validación

1. **Cantidad de Columnas**: Cada línea debe tener exactamente 4 columnas (file, text, number, hex)
2. **Campos Requeridos**: Todos los campos deben tener valores (sin campos vacíos)
3. **Campo Number**: Debe ser un entero válido
4. **Campo Hex**: Debe tener exactamente 32 caracteres y contener solo caracteres hexadecimales (0-9, a-f, A-F)

### Manejo de Datos

- **Las líneas inválidas se filtran**: Líneas que no cumplen los criterios de validación se descartan silenciosamente
- **Los archivos vacíos retornan arrays vacíos**: Archivos sin datos válidos retornan `{"file": "filename.csv", "lines": []}`
- **Las fallas de descarga se manejan graciosamente**: Si un archivo no puede descargarse, se omite sin fallar la solicitud completa
- **La fila de encabezados se ignora**: La primera línea de cada archivo CSV se trata como encabezado y se omite

## Integración con API Externa

### Detalles de la API

- **Base URL**: `https://echo-serv.tbxnet.com`
- **Autenticación**: Bearer Token
- **Documentación**: https://echo-serv.tbxnet.com/explorer/#/Secret

### Endpoints Externos Utilizados

1. **GET /v1/secret/files** - Listar archivos disponibles
2. **GET /v1/secret/file/{filename}** - Descargar archivo específico

### Manejo de Errores

La API maneja varios errores de la API externa:

- Timeouts de red (timeout de 30 segundos)
- Errores HTTP (404, 500, etc.)
- Respuestas JSON inválidas
- Datos CSV faltantes o malformados

## Desarrollo

### Estructura del Código

- **src/index.js**: Punto de entrada que carga variables de entorno e inicia el servidor
- **src/server.js**: Configuración de la aplicación Express con middleware y rutas
- **src/routes/files.js**: Manejadores de rutas para endpoints de archivos
- **src/services/externalApi.js**: Cliente HTTP para comunicación con API externa
- **src/utils/csvParser.js**: Lógica de parseo y validación de CSV

### Testing

La suite de tests incluye:

- Tests unitarios para funciones de parseo de CSV
- Tests unitarios para lógica de validación
- Tests de integración para endpoints de API
- Tests de manejo de errores

Cobertura de tests incluye:

- Parseo de líneas CSV válidas e inválidas
- Validación hexadecimal
- Parseo de números y verificación de tipos
- Procesamiento de múltiples archivos
- Validación de respuestas HTTP
- Escenarios de error

## Variables de Entorno

| Variable         | Descripción                     | Por Defecto                  | Requerido |
| ---------------- | ------------------------------- | ---------------------------- | --------- |
| PORT             | Puerto del servidor             | 3000                         | No        |
| EXTERNAL_API_URL | URL base de la API externa      | https://echo-serv.tbxnet.com | Sí        |
| API_KEY          | Bearer token para autenticación | Bearer aSuperSecretKey       | Sí        |

## Solución de Problemas

### Problemas Comunes

**Puerto ya en uso:**

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

Solución: Cambiar el PORT en `.env` o detener el proceso usando el puerto 3000.

**Variables de entorno faltantes:**

```bash
Error: Server configuration error
```

Solución: Asegurarse de que el archivo `.env` existe y contiene todas las variables requeridas.

**API externa no alcanzable:**

```bash
Error: Service temporarily unavailable
```

Solución: Verificar la conexión a internet y que la API externa esté operacional.

## Ejemplos

### Usando curl

```bash
# Obtener todos los datos CSV procesados
curl -v -X GET "http://localhost:3000/files/data" -H "accept: application/json"

# Obtener lista de archivos disponibles
curl -X GET "http://localhost:3000/files/list"

# Health check
curl -X GET "http://localhost:3000/"
```

### Usando JavaScript fetch

```javascript
// Obtener datos CSV procesados
fetch("http://localhost:3000/files/data")
  .then((response) => response.json())
  .then((data) => {
    console.log("Files:", data);
    data.forEach((file) => {
      console.log(`File: ${file.file}`);
      console.log(`Valid lines: ${file.lines.length}`);
    });
  })
  .catch((error) => console.error("Error:", error));
```

## Consideraciones de Performance

- Los archivos se descargan en paralelo para mejor rendimiento
- Timeout de 30 segundos por descarga de archivo
- Las descargas fallidas no bloquean las exitosas
- La respuesta se envía en stream para datasets grandes

## Seguridad

- CORS habilitado para integración con frontend
- Autenticación con Bearer token para API externa
- Variables de entorno para configuración sensible
- No requiere dependencias globales

## Licencia

ISC

## Autor

Toolbox Fullstack Challenge Project
