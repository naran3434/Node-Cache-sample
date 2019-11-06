/**
 * Created by naran on 6/11/19.
 * Author : Naranz
 * All the functions has default params as per express js
 * req - request data
 * res - response data
 * next - callback function
 * */


let CacheController = require('./CacheController');
let StudentController = require('./StudentController');


const ttl = 60 * 60 * 3; // cache for 3 Hour
const cache = new CacheController(ttl); // Create a new cache service instance


module.exports = {

    // attendance list from cache
    list: function (req, res, next) {
        cache.get('attendance').then((result) => {
            req.resData = result;
            req.resDataCount = result.length;
            next();
        }).catch((error) => {
            next();
        });
    },

    // store student attendance to cache
    store: function (req, res, next) {

        req.body.id = Date.now();

        StudentController.find(req.body.roll_no).then((result) => {
            req.body.student_id = result.id;

            cache.get('attendance').then((attendance) => {

                let data = [...attendance, req.body];
                cache.store('attendance', data);
                req.resData = req.body;
                next();

            }).catch((error) => {
                // for the first record
                let data = [req.body];
                cache.store('attendance', data);
                req.resData = req.body;
                next();
            });
        }).catch((err) => {
            res.status(422).json({ errors: {
                    "msg": "The roll no not found",
                    "param": "roll_no",
                    "location": "body"
            }
            });
        });


    },

    // get attendance by id
    edit: function (req, res, next) {
        cache.get('attendance').then((result) => {
            if(result && result.length > 0) {
                req.resData = [...result].find((std) => {
                    return parseInt(std.id) === parseInt(req.params.id);
                });

                req.resDataCount = req.resData ? 1 : 0;
                next();
            } else {
                next();
            }
        }) .catch((error) => {
            next();
        });
    },

    // update student attendance
    update: function (req, res, next) {

            cache.get('attendance').then((attendance) => {

                if(attendance && attendance.length > 0) {
                    const index = [...attendance].findIndex((std) => {
                        return parseInt(std.id) === parseInt(req.params.id);
                    });

                    attendance[index] = {
                        ...req.body,
                        student_id: attendance[index]['student_id'],
                        id: req.params.id
                    };

                    cache.store('attendance', attendance);
                }
                next();

            }).catch((error) => {
                // for the first record
                next();
            });

    },

    // delete the attendance
    destroy: function (req, res, next) {
        cache.get('attendance').then((result) => {
            if(result && result.length > 0) {
                const index = [...result].findIndex((std) => {
                    return parseInt(std.id) === parseInt(req.params.id);
                });

                if(index >= 0) delete result.splice(index, 1);

                cache.store('attendance', [...result]);
                next();
            } else {
                next();
            }
        })
    }
};
