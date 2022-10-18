const { randomWorkspaceProperties, getWorkspaceIdProperties, getHostWorkspaceProperties, createWorkspaceProperties, getWorkspacesProperties, 
        patchWorkspaceIdProperties, patchWorkspaceStateProperties, randomWorkspaceExample, getWorkspaceIdExample, getHostWorkspaceExample, 
        createWorkspaceExample, getWorkspacesExample, patchWorkspaceIdExample, patchWorkspaceStateExample, addWorkspaceImageProperties, 
        addWorkspaceImageExample } = require ('../swaggerSchemas/workspace');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');


const randomWorkspace = {

    //~ --------------------------------------------- FETCH 5 RANDOM WORKSPACE
    get: {
        tags: ['Workspace'],
        summary: 'Fetch 5 random workspace',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:randomWorkspaceProperties,
                            example: randomWorkspaceExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const getWorkspaceId = {

    //~ --------------------------------------------- FETCH WORKSPACE BY ID
    get: {
        tags: ['Workspace'],
        summary: 'Fetch a workspace by id',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:getWorkspaceIdProperties,
                            example: getWorkspaceIdExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const getHostWorkspace = {

    //~ --------------------------------------------- FETCH HOST WORKSPACE
    get: {
        tags: ['Workspace'],
        summary: 'Fetch workspaces from a host ',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:getHostWorkspaceProperties,
                            example: getHostWorkspaceExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const createWorkspace = {

    //~ --------------------------------------------- CREATE WORKSPACE
    post: {
        tags: ['Workspace'],
        summary: 'Create a workspace',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:createWorkspaceProperties,
                            example: createWorkspaceExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const getWorkspaces = {

    //~ --------------------------------------------- FETCH ALL WORKSPACE
    post: {
        tags: ['Workspace'],
        summary: 'Fetch all workspaces',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:getWorkspacesProperties,
                            example: getWorkspacesExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const addWorkspaceImage = {

    //~ --------------------------------------------- ADD WORKSPACE IMAGE
    post: {
        tags: ['Workspace'],
        summary: 'Add workspace images',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: addWorkspaceImageProperties,
                            example: addWorkspaceImageExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const patchWorkspaceId = {

    //~ --------------------------------------------- UPDATE WORKSPACE
    patch: {
        tags: ['Workspace'],
        summary: 'Update a workspace',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:patchWorkspaceIdProperties,
                            example: patchWorkspaceIdExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const patchWorkspaceState = {

    //~ --------------------------------------------- UPDATE WORKSPACE STATE
    patch: {
        tags: ['Workspace'],
        summary: 'Update a workspace state',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:patchWorkspaceStateProperties,
                            example: patchWorkspaceStateExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}


module.exports = { randomWorkspace, getWorkspaceId, getHostWorkspace, createWorkspace, getWorkspaces, patchWorkspaceId, patchWorkspaceState, addWorkspaceImage };