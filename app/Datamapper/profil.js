const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

async getPersonalspaceByPk(userId) {

    const queryString = `
    SELECT "user".id, "user".last_name, "user".first_name, "user".email, "user".username, "user".avatar, "user".about, "user".gender, role.description AS role 
    FROM "user"
    JOIN role ON role.id = "user".role_id
    WHERE "user".id = $1
    `;
    
    const result = await client.query(queryString, [userId]);

    return result.rows;
},

async updatePersonalspace(userId, userBody) {

    let queryString = "";
    let counter = 1;
    let queryParams = [];
    let values = [];
    let columns = [];

    for (const key in userBody){
        columns.push(key);
        queryParams.push(`$${counter}`);
        counter++

        values.push(userBody[key]);
    }

    if (queryParams.length > 1) {
        queryString = `UPDATE "user" SET ( ${columns.join(',')} ) = ( ${queryParams.join(',')} ) WHERE id = ${userId} RETURNING ${columns.join(',')};`;

    } else {
        queryString = `UPDATE "user" SET ${columns.join(',')} = ${queryParams.join(',')} WHERE id = ${userId} RETURNING ${columns.join(',')};`;
    }

    const result = await client.query(queryString, [...values]);

    return result.rows;
}


}

