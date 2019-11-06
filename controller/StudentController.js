/**
 * Created by naran on 6/11/19.
 * Author : Naranz
 * All the functions has default params as per express js
 * req - request data
 * res - response data
 * next - callback function
 * */


let CacheController = require('./CacheController');


const ttl = 60 * 60 * 3; // cache for 3 Hour
const cache = new CacheController(ttl); // Create a new cache service instance


module.exports = {

    // student list from cache
    list: function (req, res, next) {
        cache.get('students').then((result) => {
            req.resData = result;
            req.resDataCount = result.length;
            next();
        }).catch((error) => {
            next();
        });
    },

    // store student to cache
    store: function (req, res, next) {

        req.body.id = Date.now();

        cache.get('students').then((result) => {
            let data = [...result, req.body];
            cache.store('students', data);
            req.resData = req.body;
            next();
        }).catch((error) => {
            // for the first record
            let data = [req.body];
            cache.store('students', data);
            req.resData = req.body;
            next();
        });
    },

    // get student by roll no
    edit: function (req, res, next) {
      cache.get('students').then((result) => {
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

    update: function (req, res, next) {
        cache.get('students').then((result) => {
            if(result && result.length > 0) {
                const index = [...result].findIndex((std) => {
                    return parseInt(std.id) === parseInt(req.params.id);
                });

                result[index] = {
                    ...req.body,
                    id: req.params.id
                };

                cache.store('students', result);
                next();
            } else {
                next();
            }
        }) .catch((error) => {
            next();
        });
    },

    // delete the student
    destroy: function (req, res, next) {
        cache.get('students').then((result) => {
            if(result && result.length > 0) {
                const index = [...result].findIndex((std) => {
                    return parseInt(std.id) === parseInt(req.params.id);
                });

                console.log(index);

                if(index >= 0) delete result.splice(index, 1);

                cache.store('students', [...result]);
                next();
            } else {
                next();
            }
        })
    },

    // check the  uniques of roll no
    unique: function (req, res, next) {
        cache.get('students').then((result) => {
            if(result && result.length > 0) {
                const student = [...result].find((std) => {
                    return std.roll_no == req.body.roll_no;
                });

                if(student){
                    res.status(422).json({ errors: {
                        "msg": "The roll no already taken",
                        "param": "roll_no",
                        "location": "body"
                    } })
                } else {
                    next();
                }
            } else {
                next();
            }
        }).catch((error) => {
            next();
        });
    },

    // check the uniques using id
    uniqueById: function (req, res, next) {
        cache.get('students').then((result) => {
            if(result && result.length > 0) {
                const student = [...result].find((std) => {
                    return std.roll_no == req.body.roll_no && parseInt(std.id) !== parseInt(req.params.id);
                });

                if(student){
                    res.status(422).json({ errors: {
                        "msg": "The roll no already taken",
                        "param": "roll_no",
                        "location": "body"
                    } })
                } else {
                    next();
                }
            } else {
                next();
            }
        }).catch((error) => {
            next();
        });
    },

    // find the student using roll no
    find: function (roll_no) {
        return cache.get('students').then((result) => {
                if(result && result.length > 0) {
                    const student = [...result].find((std) => {
                        return std.roll_no == roll_no;
                    });

                    if(student){
                        return Promise.resolve(student);
                    }
               }
                return Promise.reject(null);
            }).catch((err) => {
                return Promise.reject(null);
            });
    }
};