const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ADA Fastfood API',
      version: '1.0.0',
      description: 'Tài liệu API cho hệ thống ADA Fastfood',
    },
    servers: [
      { url: 'http://localhost:5000' }
    ],
  },
  apis: ['./src/api/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;