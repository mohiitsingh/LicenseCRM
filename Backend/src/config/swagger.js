const swaggerJsdoc = require( "swagger-jsdoc");

const options = {
    definition: {

        openapi: "3.0.0",

        info: {

            title: "License Portal API",

            version: "1.0.0",

            description:
                "License Portal Backend APIs"

        }

    },

    apis: [
        "./src/modules/**/*.js"
    ]

};

const swaggerSpec =
swaggerJsdoc(options);

module.exports = swaggerSpec;