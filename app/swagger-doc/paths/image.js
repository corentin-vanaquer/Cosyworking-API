const {deleteImageProperties, deleteImageExample} = require('../swaggerSchemas/image');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');

const deleteImage = {

    //~ --------------------------------------------- DELETE IMAGE
    post: {
        tags: ['Image'],
        summary: 'Delete image',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:deleteImageProperties,
                            example: deleteImageExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}


module.exports = { deleteImage };