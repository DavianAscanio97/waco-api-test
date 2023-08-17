const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Documentación',
            version: '1.0.0',
            description: 'Una API para prueba WACO | DAVIAN ASCANIO',
        },
        components: {
            securitySchemes: {
                BearerAuth: { // Define el esquema de seguridad
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            BearerAuth: []
        }], // Indica que se debe usar el esquema de seguridad BearerAuth
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
