const express = require('express');
const router = express.Router();

// JWT VALIDATION
const verifyAccesRight = require('../../middleware/verifyAccessRight');

// ERROR HANDLER
const controllerHandler = require('../../helpers/controllerHandler');

// CONTROLLER
const { workspaceController: controller } = require("../../controllers/api")


//~ ---------- GET
router.get("/workspace/find-random", controllerHandler(controller.findRandom));

router.get("/workspace/:id(\\d+)", controllerHandler(controller.findById));

router.get("/personalspace/:hostid(\\d+)/workspace",[verifyAccesRight.verifyToken, verifyAccesRight.isHost], controllerHandler(controller.findWorkspacesByHost));

//~ ---------- POST
router.post("/workspace/create", [verifyAccesRight.verifyToken, verifyAccesRight.isHost], controllerHandler(controller.create));

router.post("/workspace/search", controllerHandler(controller.searchWorkspaces));

router.post("/workspace/:id(\\d+)/images/add",[verifyAccesRight.verifyToken, verifyAccesRight.isHost] , controllerHandler(controller.addImages));

//~ ---------- PATCH
router.patch("/workspace/:id(\\d+)", [verifyAccesRight.verifyToken, verifyAccesRight.isHost], controllerHandler(controller.updateOne));

router.patch("/workspace/state/:id(\\d+)",[verifyAccesRight.verifyToken, verifyAccesRight.isHost],  controllerHandler(controller.updateState));



module.exports = router;
