/**
 * Created by naran on 6/11/19.
 * Author : Naranz
 * Rules for store student
 * */

const { check } = require('express-validator');

module.exports = {
    rules: [
        check('roll_no').isLength({ min: 3 })
            .withMessage('The roll no should be min 3 character'),
        check('name').isLength({min: 1})
            .withMessage('The name field is required'),
        check('standard').isLength({min: 1})
            .withMessage('The standard field is required'),
    ]
};



