const express = require('express');
const router = express.Router();

// Middleware && helper && controller
const giveAccessToken = require('../../middleware/giveAccessToken');
const { ApiError } = require('../../helpers/errorHandler');
const { apiController } = require('../../controllers/api');

// Default prefixing API's route,
router.all('/', apiController.home);

// Import all router files
const authRouter = require('./auth');
const bookingRouter = require('./booking');
const profilRouter = require('./profil');
const userRouter = require('./user')
const workspaceRouter = require('./workspace');
const equipmentRouter = require('./equipment');
const imageRouter = require('./image');

// Default prefixing API's route,
router.all('/', apiController.home);

// Gives acces to x-access-token in header
router.use(giveAccessToken);

// Use all router files
router.use(authRouter);
router.use(bookingRouter);
router.use(userRouter);
router.use(workspaceRouter);
router.use(equipmentRouter);
router.use(profilRouter);
router.use(imageRouter);

// Use error handler
router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});


module.exports = router;
