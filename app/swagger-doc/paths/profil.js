const {profilProperties, profilExample, updateProfilProperties, updateProfilExample} = require('../swaggerSchemas/profil');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');

const getProfil = {

    //~ --------------------------------------------- FETCH PROFIL BY ID
    get: {
        tags: ['Profil'],
        summary: 'Fetch profil by id',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: profilProperties,
                            example: profilExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const patchProfil = {

    //~ --------------------------------------------- PATCH PROFIL BY ID
    patch: {
        tags: ['Profil'],
        summary: 'Update profil by id',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: updateProfilProperties,
                            example: updateProfilExample  
                        }
                    }
                }
            },
            404: error404
        }
    },
}


module.exports = { getProfil, patchProfil };