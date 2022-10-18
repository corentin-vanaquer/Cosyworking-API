const { json } = require('express');
const { query } = require('../config/db');
const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

  /**
   * Check if email already existing
   * @param {String} emailToFind 
   * @returns 
   */
  async findByEmail(emailToFind) {

    const queryString = 'SELECT email FROM "user" WHERE email = $1'
    const result = await client.query(queryString, [emailToFind]);

    return result.rows;
  },

  /**
   * Get a user according to his email
   * @param {String} emailToFind 
   * @returns 
   */
  async findUserLoggedByEmail(emailToFind) {

    const queryString = 'SELECT "user".id, "user".email, "user".password, role.id AS role_id, role.description AS role_description, avatar  FROM "user" JOIN role ON "user".role_id = role.id WHERE "user".email = $1';
  
    const result = await client.query(queryString, [emailToFind]);

    return result.rows;
  },

  /**
   * Create a new user
   * @param {Object} userToInsert 
   * @returns 
   */
  async create(userToInsert) {

    const values = [];
    const columns = [];
    let counter = 1;
    const queryParams = [];
    
    for (const key in userToInsert) {
      columns.push(key);
      queryParams.push(`$${counter}`);
      counter++
      
      values.push(userToInsert[key]);
    }

    const queryString = `INSERT INTO "user" (${columns.join(',')}) VALUES (${queryParams.join(',')}) RETURNING *`;

    const result = await client.query(queryString, [...values]);

    return result.rows;
  },

  /**
   * 
   * @param {*} userId 
   * @returns 
   */
  async getUserByPk(userId) {
  
    const queryString = `SELECT get_user($1)`;

    const result = await client.query(queryString, [userId]);

    return result.rows;
  }
};
