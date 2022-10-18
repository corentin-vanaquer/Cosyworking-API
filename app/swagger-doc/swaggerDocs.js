const swagger = require('swagger-jsdoc');
const swaggerJSDoc = swagger;
const { serve, setup } = require('swagger-ui-express');
const { components } = require ('./swagger-utils/swaggerComponents.js');

const { signup, login } = require('./paths/auth');
const { userId } = require('./paths/user');
const { getProfil, patchProfil } =  require('./paths/profil');
const { randomWorkspace, getWorkspaceId, getHostWorkspace, createWorkspace, getWorkspaces, patchWorkspaceId, patchWorkspaceState, addWorkspaceImage } = require ('./paths/workspace');
const { equipment } = require ('./paths/equipment');
const { getCoworkerBooking, getWorkspaceBooking, getHostBooking, createBookingRequest, patchBookingState } = require ('./paths/booking');
const { deleteImage } = require ('./paths/image');


const options = {

    definition: {

        // Les informations principales
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'CosyWorking',
            description: `Location espace de travail.`,
            license: {
                name: 'MIT'
            },
        },
      
        // Tous les serveurs
        servers: [
            {
                url: 'http://localhost:3000/docs',
                description: 'API v1'
            },
            // {
            //     url: 'http://localhost:4100/api/v2',
            //     description: 'API v2'
            // },
        ],
       
        // Tous les chemins ( GET / POST / PATCH / DELETE )
        paths: {

            //~ ------------- AUTH
            '/api/auth/signup': signup,
            '/api/auth/login': login,
            
            //~ ------------- USER
            '/api/user/{id}': userId,

            //~ ------------- PROFIL
            '/api/personalspace/{id}/profil': getProfil,
            '/api/personalspace/{id}/profil ': patchProfil,

            //~ ------------- WORKSPACE
            '/api/workspace/find-random': randomWorkspace,
            '/api/workspace/{id}': getWorkspaceId,
            '/api/personalspace/{hostid}/workspace': getHostWorkspace,
            '/api/workspace/create': createWorkspace, 
            '/api/workspace/search': getWorkspaces,
            '/api/workspace/{id}/images/add': addWorkspaceImage,
            '/api/workspace/{id} ': patchWorkspaceId,
            '/api/workspace/state/{id}': patchWorkspaceState,

            //~ ------------- EQUIPMENT
            '/api/equipments': equipment,

            //~ ------------- BOOKING
            '/api/personalspace/{id}/coworkerbooking': getCoworkerBooking,
            '/api/workspace/{id}/bookeddate': getWorkspaceBooking,
            '/api/personalspace/{hostid}/booking': getHostBooking,
            '/api/booking/request': createBookingRequest,
            '/api/booking/{id}/state': patchBookingState,

            //~ ------------- IMAGE
            '/api/workspace/{id}/image': deleteImage,
        },

        // Tous les schemas
        components,

        // Element correspondant à la sécurité
        securitySchemes: {
            api_key: {
                type: 'apiKey',
                name: 'api_key',
                in: 'header'
            },
        }
    },

    apis: ['./app/routers/*.js']
    // Equivalent à 
    // apis: ['./*/*/*.js']
};

const specs = swaggerJSDoc(options);


module.exports =  { specs, serve, setup};
