require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API',
    },
    servers: [
      {
        url: process.env.SWAGGER_URL,
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);


const swaggerMiddleware = swaggerUi.serve;
const swaggerDocs = swaggerUi.setup(specs);

module.exports = { swaggerMiddleware, swaggerDocs };
