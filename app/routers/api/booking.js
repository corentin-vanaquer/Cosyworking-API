const express = require('express');
const router = express.Router();

// JS VALIDATION
const validate = require('../../validation/validator');
const bookingUpdateSchema = require('../../validation/schemas/bookingUpdateSchema');

// JWT VALIDATION
const verifyAccesRight = require('../../middleware/verifyAccessRight');
const { verifyToken } = require('../../middleware/verifyAccessRight');

// ERROR HANDLER
const controllerHandler = require('../../helpers/controllerHandler');

// CONTROLLER
const { bookingController } = require("../../controllers/api");


//~ ---------- GET
router.get("/personalspace/:id(\\d+)/coworkerbooking",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate], controllerHandler(bookingController.findBookingByCoworker));

router.get("/workspace/:id(\\d+)/bookeddate", controllerHandler(bookingController.findBookedDate));

router.get("/personalspace/:hostid(\\d+)/booking", [verifyAccesRight.verifyToken, verifyAccesRight.isHost], controllerHandler(bookingController.findBookingByHost));

//~ ---------- POST
router.post("/booking/request",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate] ,controllerHandler(bookingController.bookingRequest));

//~ ---------- PATCH
router.patch("/booking/:id(\\d+)/state",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate,validate('body', bookingUpdateSchema)], controllerHandler(bookingController.stateUpdate));


module.exports = router;
