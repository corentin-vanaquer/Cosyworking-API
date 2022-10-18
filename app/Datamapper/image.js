const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async addImage(workspaceId, imageList) {
    
    const queryImage = [];
    const values = [];
    let counter = 2;

    for(const key of imageList){
      if (key.fieldname.includes("mainImage")) {
        queryImage.push(`($1, $${counter}, true)`);
      } else {
        queryImage.push(`($1, $${counter}, false)`);
      }

      // Supprime la première partie du lien => public
      const path = key.path
      .split('/')
      .slice(1)
      .join('/');

      values.push(path);
      counter++;
    }

    const queryString = `
    INSERT INTO image (workspace_id, link, main_image) 
    VALUES ${queryImage.join(',')};
    `;

    const result = await client.query(queryString, [workspaceId, ...values]);

    return result.rows;
  },

  async deleteWorkspaceImages(workspaceId, searchDetails){

    const imageId = searchDetails.image_id;

    let queryString = "DELETE FROM image WHERE image.workspace_id = $1 AND image.id = $2 RETURNING *";

    await client.query(queryString, [workspaceId, imageId]);

    const result = await client.query(`SELECT id as image_id, link, main_image, workspace_id FROM image WHERE workspace_id = $1`, [workspaceId]);

    return result.rows
  },

    async updateMainImage(workspaceId, imageList) {

    await client.query(`DELETE FROM image WHERE workspace_id = $1 AND main_image = true`, [workspaceId]);

    // Supprime la première partie du lien => public
    const path = imageList[0].path
    .split('/')
    .slice(1)
    .join('/');

    await client.query(`INSERT INTO image (workspace_id, main_image, link) VALUES ($1, $2, $3)`, [workspaceId, true, path])

    const result = await client.query(`SELECT id as image_id, link, main_image, workspace_id FROM image WHERE workspace_id = $1`, [workspaceId]);

    return result.rows;

  },

  async updateImages(workspaceId, imageList) {

    const path = imageList[0].path
    .split('/')
    .slice(1)
    .join('/');

    await client.query(`INSERT INTO image (workspace_id, main_image, link) VALUES ($1, $2, $3)`, [workspaceId, false, path]);

    const result = await client.query(`SELECT id as image_id, link, main_image, workspace_id FROM image WHERE workspace_id = $1`, [workspaceId]);

    return result.rows;
  }
};