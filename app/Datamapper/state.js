const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

    async getFromStateDescription(stateToFind) {

        const queryString = `SELECT id FROM state WHERE description = $1`;
        const result = await client.query(queryString, [stateToFind]); 
        return result.rows[0].id;

    }

};
