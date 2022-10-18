const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const verifyAccesRight = require('../../middleware/verifyAccessRight');

const imageController = require("../../controllers/api/image")

/**
 * DELETE /api/workspace/
 * @summary Create a new workspace
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
 router.post("/workspace/:id(\\d+)/image", [verifyAccesRight.verifyToken, verifyAccesRight.isHost], controllerHandler(imageController.delete));

module.exports = router;