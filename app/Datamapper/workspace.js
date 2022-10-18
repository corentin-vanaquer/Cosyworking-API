const { query } = require("../config/db");
const client = require("../config/db");

module.exports = {

  async getWorkspaceByPk(workspaceId) {
  const queryString = `
  SELECT json_build_object(
    'workspace',workspace.*,
      'user', (SELECT json_agg(json_build_object('host_id', "user".id, 'host', "user".first_name, 
                          'host_avatar',"user".avatar))
           FROM "user" 
           JOIN workspace ON workspace.user_id = "user".id
           where workspace.id = $1
          ),
    'images', (SELECT json_agg(json_build_object('image_id', image.id, 'link', image.link, 'main',image.main_image))
           FROM image 
           JOIN workspace ON workspace.id = image.workspace_id
           where workspace.id = $1
          ),
      'booking_list', (SELECT json_agg(json_build_object('booking_id', booking.id, 'start_date', booking.start_date, 
                               'end_date',booking.end_date))
           FROM booking 
           JOIN workspace ON workspace.id = booking.workspace_id
			      JOIN state ON state.id = booking.state_id
           where workspace.id = $1 AND (state.description = 'En attente' OR state.description = 'Validé')
          ),
      'equipments_list', (SELECT json_agg(json_build_object('equipment_id', equipment.id, 'description', equipment.description, 
                               'icon_link', equipment.icon_link))
           FROM workspace_has_equipment 
           JOIN equipment ON equipment.id = workspace_has_equipment.equipment_id
           where workspace_has_equipment.workspace_id = $1
          )
  ) as workspace_details
  FROM workspace
  WHERE workspace.id = $1;
  `;
  const result = await client.query(queryString, [workspaceId]);

  return result.rows;
  },

  async getWorkspacesByHostId(hostId) {
    const queryString = `
      SELECT json_build_object(
        'workspace',workspace.*,
        'images', (SELECT json_agg(json_build_object('link', image.link, 'main',image.main_image))
              FROM user 
              INNER JOIN image ON image.workspace_id = workspace.id
      )
      )
      FROM workspace
      WHERE workspace.user_id = $1;
      `;

    const result = await client.query(queryString, [hostId]);

    return result.rows;
  },

  async create(workspaceToInsert) {
    
    const values = [];
    const columns = [];
    let counter = 1;
    const queryParams = [];
    
    for (const key in workspaceToInsert) {
      columns.push(key)
      queryParams.push(`$${counter}`);
      counter ++;
      
      values.push(workspaceToInsert[key]);
    };
    
    const queryString = `INSERT INTO "workspace" (${columns.join(',')}) VALUES (${queryParams.join(',')}) RETURNING *`;
    
    const result = await client.query(queryString, [...values]);
    
    return result.rows;

    return;
  },

  async getRandom(){
    
    const queryString = `
    SELECT workspace_id, workspace.title, workspace.day_price, workspace.city, image.id, image.link as image_link
    FROM workspace
    JOIN image ON image.workspace_id = workspace.id
    WHERE image.main_image = true
    ORDER BY RANDOM() LIMIT 5;
    `;
    
    const result = await client.query(queryString);
    return result.rows;
  },

  async patchOne(workspaceId, updatedWorkspace) {

    let queryString = "";
    let counter = 1;
    let queryParams = [];
    let values = [];
    let columns = [];

    for (const key in updatedWorkspace ) {
      columns.push(key);
      queryParams.push(`$${counter}`);
      counter ++;

      values.push(updatedWorkspace[key]);
    }

    if (queryParams.length > 1 ) {
      queryString = `UPDATE workspace SET ( ${columns.join(',')} ) = (${queryParams.join(',')}) WHERE id = ${workspaceId} RETURNING ${columns.join(',')};`;

    } else {
      queryString = `UPDATE workspace SET ${columns.join(',')} = ${queryParams.join(',')} WHERE id = ${workspaceId} RETURNING ${columns.join(',')};`;
    }

    const result = await client.query(queryString, [...values]);

    return result.rows;

    return;
  },

  async patchState(workspaceId, newState) {
    const queryString = `UPDATE workspace SET availability = $2 WHERE workspace.id = $1`;

    await client.query(queryString, [workspaceId, newState]);

    return;
  },

  async getWorkspacesFromSearch(searchDetails) {
    const { city, date_list, equipments } = searchDetails;

    let counter = 1;
    let values = [];
    let startDate = [];
    let endDate = [];
    let equipmentsList = [];
    let startDateString = `(`;
    let endDateString = `(`;
    let equipmentString = '';
    let queryString = '';

    values.push(city);

    for (const date of date_list) {
      startDate.push(date.start_date);
      endDate.push(date.end_date);
    }

    for (const equipment of equipments) {
      if (equipment != null) {
        equipmentsList.push(equipment);
      }
    }

    // ************* Logique de création des query String *************

    if ( date_list.length === 0 && equipments.length === 0 ){
      queryString = `SELECT DISTINCT workspace.id, workspace.title, workspace.description, workspace.day_price, workspace.latitude, workspace.longitude, image.link
      FROM workspace 
      JOIN image ON image.workspace_id = workspace.id
      WHERE image.main_image = true AND workspace.city = $1`;

    } else if(date_list.length > 0 && equipments.length === 0) {

      // ************* Logique de création des morceaux de query pour les dates *************

      for (const date of startDate) {
        values.push(date);
        counter++;
        startDateString += `$${counter},`;
      }
      
      if ( startDateString.length > 1 ) {
        startDateString = startDateString.slice(0, -1);
      }
      startDateString += ')';
  
  
      for (const date of endDate) {
        values.push(date);
        counter++;
        endDateString += `$${counter},`;
      }
      if ( endDateString.length > 1 ) {
        endDateString = endDateString.slice(0, -1);
      }
  
      endDateString += ')';

      queryString = `SELECT DISTINCT workspace.id, workspace.title, workspace.description, workspace.day_price, workspace.latitude, workspace.longitude, image.link
      FROM workspace 
      JOIN image ON image.workspace_id = workspace.id
      WHERE 
      image.main_image = true
      AND (workspace.id NOT IN (
        SELECT DISTINCT booking.workspace_id 
        FROM booking 
        WHERE booking.start_date IN ${startDateString}
        OR booking.end_date IN ${endDateString})    
        AND workspace.city = $1)
      OR (workspace.id NOT IN (Select DISTINCT booking.workspace_id FROM booking) 
        AND workspace.city = $1)`;


    } else if (date_list.length > 0 && equipments.length > 0 ) {

      // ************* Logique de création des morceaux de query pour les dates *************

      for (const date of startDate) {
        values.push(date);
        counter++;
        startDateString += `$${counter},`;
      }
      
      if ( startDateString.length > 1 ) {
        startDateString = startDateString.slice(0, -1);
      }
      startDateString += ')';
  
  
      for (const date of endDate) {
        values.push(date);
        counter++;
        endDateString += `$${counter},`;
      }
      if ( endDateString.length > 1 ) {
        endDateString = endDateString.slice(0, -1);
      }
  
      endDateString += ')';

      // ************* Logique de création des morceaux de query pour les équipements *************

      if (equipmentsList.length > 1) {
        equipmentString = `SELECT workspace_has_equipment.workspace_id
        FROM workspace_has_equipment
        WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = `;
        let index = 0;
        for (const equipment of equipmentsList ) {
          index ++;
          values.push(equipment);
          counter++;
          if (index === equipmentsList.length) {
            equipmentString += `$${counter})`;
          } else {
            equipmentString += `$${counter}) INTERSECT
            SELECT workspace_has_equipment.workspace_id
            FROM workspace_has_equipment
            WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = `
          }
        }
      } else {
        values.push(equipmentsList[0])
        counter++;
        equipmentString = `SELECT workspace_has_equipment.workspace_id
        FROM workspace_has_equipment
        WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = $${counter})`;
      }
  
      queryString = `SELECT DISTINCT workspace.id, workspace.title, workspace.description, workspace.day_price, workspace.latitude, workspace.longitude, image.link
      FROM workspace 
      JOIN image ON image.workspace_id = workspace.id
      WHERE 
      image.main_image = true
      AND (workspace.id NOT IN (
        SELECT DISTINCT booking.workspace_id 
        FROM booking 
        WHERE booking.start_date IN ${startDateString}
        OR booking.end_date IN ${endDateString})    
        AND workspace.city = $1
        AND workspace.id IN (SELECT * FROM (
       ${equipmentString}
        ) as workspace_by_equipment))
      OR (workspace.id NOT IN (Select DISTINCT booking.workspace_id FROM booking) 
        AND workspace.city = $1 
        AND workspace.id IN (SELECT * FROM (
          ${equipmentString}
        ) as workspace_by_equipment))`;

    } else if (date_list.length === 0 && equipments.length > 0) {

      // ************* Logique de création des morceaux de query pour les équipements *************

      if (equipmentsList.length > 1) {
        equipmentString = `SELECT workspace_has_equipment.workspace_id
        FROM workspace_has_equipment
        WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = `;
        let index = 0;
        for (const equipment of equipmentsList ) {
          index ++;
          values.push(equipment);
          counter++;
          if (index === equipmentsList.length) {
            equipmentString += `$${counter})`;
          } else {
            equipmentString += `$${counter}) INTERSECT
            SELECT workspace_has_equipment.workspace_id
            FROM workspace_has_equipment
            WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = `
          }
        }
      } else {
        values.push(equipmentsList[0])
        counter++;
        equipmentString = `SELECT workspace_has_equipment.workspace_id
        FROM workspace_has_equipment
        WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = $${counter})`;
      }

      queryString = `SELECT DISTINCT workspace.id, workspace.title, workspace.description, workspace.day_price, workspace.latitude, workspace.longitude, image.link
      FROM workspace 
      JOIN image ON image.workspace_id = workspace.id
      WHERE image.main_image = true
      AND workspace.city = $1
      AND workspace.id IN (SELECT * FROM (${equipmentString}) as workspace_by_equipment)`;

    }

    // console.log(queryString);

    const result = await client.query(queryString, [...values]);

    return result.rows;
  },

  async getWorkspacesPrices(workspaceId) {
    const result = await client.query(`SELECT half_day_price, day_price FROM workspace WHERE id = $1;`, [workspaceId]);

    return result.rows;
  }

}