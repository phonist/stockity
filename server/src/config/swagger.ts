import swaggerJSDoc from 'swagger-jsdoc';
import env from './env';

const serverUrl = process.env.SWAGGER_SERVER_URL || `http://localhost:${env.port}`;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Stockity API',
    version: '1.0.0',
    description: 'API documentation for the Stockity server.',
  },
  servers: [{ url: serverUrl }],
};

const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: ['src/features/**/*.routes.ts', 'src/routes/**/*.routes.ts'],
});

export default swaggerSpec;
