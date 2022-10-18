const { getCoworkerBookingProperties, getWorkspaceBookingProperties, getHostBookingProperties, createBookingRequestProperties,
        patchBookingStateProperties, getCoworkerBookingExample, getWorkspaceBookingExample, getHostBookingExample, createBookingRequestExample, 
        patchBookingStateExample } = require('../swaggerSchemas/booking');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');

const getCoworkerBooking = {

    //~ --------------------------------------------- FETCH COWORKER BOOKINGS
    get: {
        tags: ['Booking'],
        summary: 'Fetch a coworker bookings',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: getCoworkerBookingProperties,
                            example: getCoworkerBookingExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const getWorkspaceBooking = {

    //~ --------------------------------------------- FETCH BOOKINGS OF A WORKSPACE
    get: {
        tags: ['Booking'],
        summary: 'Fetch bookings of a workspace',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:getWorkspaceBookingProperties,
                            example: getWorkspaceBookingExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const getHostBooking = {

    //~ --------------------------------------------- FETCH BOOKING OF A HOST
    get: {
        tags: ['Booking'],
        summary: 'Fetch bookings of a host',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:getHostBookingProperties,
                            example: getHostBookingExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const createBookingRequest = {

    //~ --------------------------------------------- CREATE BOOKING REQUEST
    post: {
        tags: ['Booking'],
        summary: 'Create booking request',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:createBookingRequestProperties,
                            example: createBookingRequestExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const patchBookingState = {

    //~ --------------------------------------------- UPDATE BOOKING STATE
    patch: {
        tags: ['Booking'],
        summary: 'Update a booking state',
        responses: {
            200: {
                description: 'Request sent successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:patchBookingStateProperties,
                            example: patchBookingStateExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

module.exports = { getCoworkerBooking, getWorkspaceBooking, getHostBooking, createBookingRequest, patchBookingState };