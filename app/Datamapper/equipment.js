const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async getAll() {
    const result = await client.query(`SELECT equipment.id, equipment.description, equipment.icon_link FROM equipment`);

    return result.rows;
  },

  async associateWorkspaceToEquipment(workspaceId, equipmentList) {

    const queryEquipment = [];
    const values = [];
    let counter = 2;

    for(const key of equipmentList){
      queryEquipment.push(`($${counter}, $1)`);
      values.push(key);
      counter++;
    }

    const queryString = `
    INSERT INTO workspace_has_equipment (equipment_id, workspace_id) 
    VALUES ${queryEquipment.join(',')};
    `;

    const result = await client.query(queryString, [workspaceId, ...values ]);

    return result.rows;
  },

  async update(workspaceId, equipmentList) {
    const queryString = `SELECT equipment_id FROM workspace_has_equipment WHERE workspace_id = $1`;

    let result = await client.query(queryString, [workspaceId]);

    equipmentList = equipmentList.map(equipment => parseInt(equipment));

    for (const itemEquipment of equipmentList ) {
      if (!result.rows.find(item => item.equipment_id === itemEquipment)) {
        await client.query(`INSERT INTO workspace_has_equipment (equipment_id, workspace_id) VALUES ($1, $2)`, [itemEquipment, workspaceId]);
      }
    }

    for (const equipment of result.rows) {
      if (!equipmentList.find(item=> item === equipment.equipment_id)) {
        await client.query(`DELETE FROM workspace_has_equipment WHERE equipment_id = $1 AND workspace_id = $2`, [equipment.equipment_id, workspaceId])
      }
    }

    result = await client.query('SELECT * FROM workspace_has_equipment WHERE workspace_id = $1', [workspaceId]);

    return;
  }
};