const express = require('express');
const router = express.Router();

// JS VALIDATION
const validate = require('../../validation/validator');
const userCreateSchema = require('../../validation/schemas/userCreateSchema');

// JWT VALIDATION
const verifySignup  = require("../../middleware/verifySignup");

// ERROR HANDLER
const controllerHandler = require('../../helpers/controllerHandler');

// CONTROLLER
const {userController: controller} = require("../../controllers/api");


//~ ---------- POST
router.post("/auth/signup",[validate('body', userCreateSchema), verifySignup.checkDuplicateEmail], controllerHandler(controller.signup));

router.post("/auth/login", controllerHandler(controller.login));


module.exports = router;