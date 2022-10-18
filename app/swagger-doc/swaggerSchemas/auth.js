const { string } = require("joi");

    //~ ------------------------------ SIGNUP

    const signupProperties = {
        id: { type: 'integer' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        gender: { type: 'string'},
        role_id: { type: 'string'},
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
    };

    const signupExample = {
        id: 'integer',
        first_name: 'string',
        last_name: 'string',
        password: 'string',
        email: 'string',
        gender: 'string',
        role_id: 'string',
        created_at: 'string',
        updated_at: 'string'
    };


    //~ ------------------------------ LOGIN

    const loginProperties = {
        email: {type: 'string'},
        password: {type: 'string'}
    };

    const loginExample = {
        email: 'string',
        password: 'string'
    };

module.exports = { signupProperties, signupExample, loginProperties, loginExample };