const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

  /**
   * Find the ID of a role
   * @param {String} descriptionToFind 
   * @returns 
   */
async findByDescription(descriptionToFind) {

    const queryString = `SELECT id FROM role WHERE description = $1`;
    const result = await client.query(queryString, [descriptionToFind]); 
    return result.rows;
  }
}