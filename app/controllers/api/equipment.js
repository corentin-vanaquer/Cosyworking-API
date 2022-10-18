const equipmentDatamapper = require('../../Datamapper/equipment');

module.exports = {
  async findAll(_, res) {
    const result = await equipmentDatamapper.getAll();

    res.json(result)

  }
}