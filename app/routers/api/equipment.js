const express = require('express');
const router = express.Router();

// ERROR HANDLER
const controllerHandler = require('../../helpers/controllerHandler');

// CONTROLLER
const { equipmentController: controller } = require("../../controllers/api")


//~ ---------- GET
router.get("/equipments", controllerHandler(controller.findAll));


module.exports = router;