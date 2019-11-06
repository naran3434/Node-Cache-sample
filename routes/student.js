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
let StoreStudent = require('../request/StoreStudent');
let ResponseController = require('../controller/ResponseController');
let StudentController = require('../controller/StudentController');



/* GET student list. */
router.get('/',
    StudentController.list,
    ResponseController.responseParseGetRequest
);

// store student
router.post('/',
    StoreStudent.rules,
    ResponseController.responseParseBodyValidation,
    StudentController.unique,
    StudentController.store,
    ResponseController.responseParseWhenCreated
);

    // get student by id
router.get('/:id/edit',
    StudentController.edit,
    ResponseController.responseParseGetRequest
);

// update student record
router.put('/:id/update',
    StoreStudent.rules,
    ResponseController.responseParseBodyValidation,
    StudentController.uniqueById,
    StudentController.update,
    ResponseController.responseParseWhenUpdated
);

// delete student record
router.delete('/:id',
    StudentController.destroy,
    ResponseController.responseParseWhenDeleted
);

module.exports = router;
