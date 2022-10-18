const profilDatamapper = require ('../../Datamapper/profil');

module.exports = {

    async findPersonalspaceById(req, res) {

        if (req.userId !== parseInt(req.params.id) ) {
            return res.json({message : "nope"});
        }

        const userId = req.params.id;

        const result = await profilDatamapper.getPersonalspaceByPk(userId);

        res.json(result);

    },

    async updatePersonalspace(req, res) {

        if (req.userId !== parseInt(req.params.id) ) {
            return res.json({message : "nope"});
        }

        const userId = req.params.id;

        const userBody = req.body;

        const result = await profilDatamapper.updatePersonalspace(userId, userBody);

        res.json(result);
    }

}