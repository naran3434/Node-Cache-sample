/**
 * Created by naran on 6/11/19.
 * Author : Naranz
 * All the functions has default params as per express js
 * req - request data
 * res - response data
 * next - callback function
 * */


const locales = require('../locales/en.json');
const { validationResult } = require('express-validator');

module.exports = {

    // when new record created
    responseParseWhenCreated: function (req, res) {
        res.status(201)
            .json({
                success: true,
                data: req.resData,
                msg: locales.DATA_CREATED
            });
    },
    
    // response for get request
    responseParseGetRequest: function (req, res) {
        if(req.queryError){
            return res.status(500)
                .json({
                    error: req.queryError
                });
        }
        return res.status(200)
            .json({
                success: req.resDataCount > 0,
                data: req.resData,
                msg: req.resDataCount > 0 ? locales.DATA_FOUND : locales.DATA_NOT_FOUND
            });
    },

    // when record updated
    responseParseWhenUpdated: function (req, res) {
        res.status(200)
            .json({
                success: true,
                data: req.resData,
                msg: locales.DATA_UPDATED
            });
    },

    // on body validation failure
    responseParseBodyValidation: function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }else{
            next();
        }
    },

    // when deleted
    responseParseWhenDeleted: function (req, res, next) {
        res.status(200)
            .json({
                success: true,
                data: {},
                msg: locales.DATA_DELETED
            });
    }
};
