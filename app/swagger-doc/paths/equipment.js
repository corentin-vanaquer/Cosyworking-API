const {equipmentProperties, equipmentExample} = require('../swaggerSchemas/equipment');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');

const equipment = {

    //~ --------------------------------------------- FETCH ALL USERS
    get: {
        tags: ['Equipment'],
        summary: 'Fetch all equipments',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:equipmentProperties,
                            example: equipmentExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}


module.exports = { equipment };