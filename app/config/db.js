require("dotenv").config();
const debug = require('debug')('SQL:log');
const { Pool } = require('pg');
 
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString});
pool.connect();
 
module.exports = {
    originalClient: pool,
    
    async query(...params) {
        debug(...params);
        return this.originalClient.query(...params);
    },
};
