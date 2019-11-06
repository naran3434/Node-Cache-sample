/**
 * Created by naran on 6/11/19.
 * Author : Naranz
 * All the functions has default params as per express js
 * req - request data
 * res - response data
 * next - callback function
 * */

var express = require('express');
var router = express.Router();
let StoreAttendance = require('../request/StoreAttendance');
let ResponseController = require('../controller/ResponseController');
let AttendanceController = require('../controller/AttendanceController');



/* GET student list. */
router.get('/',
    AttendanceController.list,
    ResponseController.responseParseGetRequest
);

// store attendance
router.post('/',
    StoreAttendance.rules,
    ResponseController.responseParseBodyValidation,
    AttendanceController.store,
    ResponseController.responseParseWhenCreated
);

// get attendance by id
router.get('/:id/edit',
    AttendanceController.edit,
    ResponseController.responseParseGetRequest
);

// update attendance record
router.put('/:id/update',
    StoreAttendance.rules,
    ResponseController.responseParseBodyValidation,
    AttendanceController.update,
    ResponseController.responseParseWhenUpdated
);

// delete attendance record
router.delete('/:id',
    AttendanceController.destroy,
    ResponseController.responseParseWhenDeleted
);

module.exports = router;
