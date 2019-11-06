/**
 * Created by naran on 6/11/19.
 * Author : Naranz
 * Rules for store attendance
 * */

const { check } = require('express-validator');

module.exports = {
    rules: [
        check('roll_no').isLength({ min: 3 })
            .withMessage('The roll no should be min 3 character'),
        check('attendance').isLength({min: 1})
            .withMessage('The attendance field is required'),
        check('date').isLength({min: 1})
            .withMessage('The date field is required')
            .isISO8601()
            .withMessage('The date should be valid'),
    ]
};