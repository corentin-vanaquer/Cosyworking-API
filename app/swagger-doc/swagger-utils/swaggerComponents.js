const { signupProperties, loginProperties} = require('../swaggerSchemas/auth');
const { userProperties } = require('../swaggerSchemas/user');
const { profilProperties, updateProfilProperties} = require ('../swaggerSchemas/profil');
const { equipmentProperties } = require ('../swaggerSchemas/equipment');
const { randomWorkspaceProperties, getWorkspaceIdProperties, getHostWorkspaceProperties, createWorkspaceProperties, getWorkspacesProperties, patchWorkspaceIdProperties, patchWorkspaceStateProperties, addWorkspaceImageProperties } = require('../swaggerSchemas/workspace');
const { getCoworkerBookingProperties, getWorkspaceBookingProperties, getHostBookingProperties, createBookingRequestProperties, patchBookingStateProperties } = require ('../swaggerSchemas/booking');
const { deleteImagePropreties } = require ('../swaggerSchemas/image');

const components = {
    schemas: {
        StatusErrors: {
            type: 'object',
            properties: {
                code: {
                    type: 'integer',
                },
                message: {
                    type: 'string'
                }
            }
        },
        //~ ---------- AUTH
        signup: {
            type: 'object',
            properties: signupProperties
        },
        login: {
            type: 'object',
            properties: loginProperties
        },
        //~ ---------- USER
        userId: {
            type: 'object',
            properties: userProperties
        },
        //~ ---------- PROFIL
        getProfil: {
            type: 'object',
            properties: profilProperties
        },
        patchProfil: {
            type: 'object',
            properties: updateProfilProperties
        },
        //~ ---------- EQUIPMENT
        equipmentProperties: {
            type: 'object',
            properties: equipmentProperties
        },
        //~ ---------- WORKSPACE
        randomWorkspace: {
            type: 'object',
            properties: randomWorkspaceProperties
        },
        getWorkspaceId: {
            type: 'object',
                properties: getWorkspaceIdProperties
        },
        getHostWorkspace: {
            type: 'object',
            properties: getHostWorkspaceProperties
        },
        createWorkspace: {
            type: 'object',
            properties: createWorkspaceProperties
        },
        getWorkspaces: {
            type: 'object',
            properties: getWorkspacesProperties
        },
        patchWorkspaceId: {
            type: 'object',
            properties: patchWorkspaceIdProperties
        },
        patchWorkspaceState: {
            type: 'object',
            properties: patchWorkspaceStateProperties
        },
        addWorkspaceImageProperties: {
            type: 'object',
            properties: addWorkspaceImageProperties,
        },
        //~ ---------- BOOKING
        getCoworkerBooking: {
            type: 'object',
            properties: getCoworkerBookingProperties
        },
        getWorkspaceBooking: {
            type: 'object',
            properties: getWorkspaceBookingProperties
        },
        getHostBooking: {
            type: 'object',
            properties: getHostBookingProperties
        },
        createBookingRequest: {
            type: 'object',
            properties: createBookingRequestProperties
        },
        patchBookingState: {
            type: 'object',
            properties: patchBookingStateProperties
        },
        //~ ---------- IMAGE
        deleteImage: {
            type: 'object',
            properties: deleteImagePropreties
        },
    }
};

module.exports = { components };