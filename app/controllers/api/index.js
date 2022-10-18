const userController = require('./user');
const bookingController = require('./booking');
const profilController = require('./profil');
const workspaceController =  require('./workspace');
const equipmentController = require('./equipment');

const apiController = {
    /**
     * Default API controller to show documention url.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    home(req, res) {
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        return res.json({
            documentation_url: `${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`,
        });
    },
};

module.exports = { apiController, userController, bookingController, profilController, workspaceController, equipmentController };

