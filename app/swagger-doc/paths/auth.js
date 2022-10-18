const { signupProperties, signupExample, loginProperties, loginExample} = require('../swaggerSchemas/auth');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');

const signup = {

    //~ --------------------------------------------- SIGNING UP
    post: {
        tags: ['Authentication'],
        summary: 'User subscribe',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:signupProperties,
                            example: signupExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const login = {

    //~ --------------------------------------------- LOGIN
    post: {
        tags: ['Authentication'],
        summary: 'User connexion',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: loginProperties,
                            example: loginExample  
                        }
                    }
                }
            },
            404: error404
        }
    },
}

module.exports = {signup, login};