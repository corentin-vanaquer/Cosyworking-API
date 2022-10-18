const express = require('express');
const router = express.Router();

// ERROR HANDLER
const controllerHandler = require('../../helpers/controllerHandler');

// CONTROLLER
const {userController: controller} = require("../../controllers/api");


//~ ---------- GET
router.get('/user/:id(\\d+)', controllerHandler(controller.findUserById))


module.exports = router;