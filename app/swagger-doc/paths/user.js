const {userProperties, userExample} = require('../swaggerSchemas/user');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');

const userId = {

    //~ --------------------------------------------- FETCH ALL USERS
    get: {
        tags: ['Users'],
        summary: 'Fetch users by id',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:userProperties,
                            example: userExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}


module.exports = { userId };