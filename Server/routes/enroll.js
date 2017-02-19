/**
 * Created by danial on 9/9/16.
 */
var db = require("mongo_schemas");
var async = require("async");
var bcrypt = require("bcrypt");
module.exports.post = function(req, res) {
    var data = req.body;
    async.waterfall([
        check_username,
        check_email,
        save_result
    ], function(err, result) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(result);
        }
    });

    function check_username(callback) {
        db.users.count({
            username: data.username
        }).lean().exec(function(err, username) {
            if (err) {
                console.mongo(err);
                callback(err, null);
            } else {
                console.mongo('Info', 'duplicate username has tried to enroll: ' + username);
                if (username) callback(null, "duplicate_username");
                else callback(null, "ok");
            }
        });
    }

    function check_email(username, callback) {
        if (username == "ok") {
            db.users.count({
                email: data.email
            }).lean().exec(function(err, email) {
                if (err) {
                    console.mongo('Error', err);
                    callback(err, null);
                } else {
                    console.mongo('Info', 'duplicate email has tried to enroll: ' + email);
                    if (email) callback(null, "duplicate_email");
                    else callback(null, "ok");
                }
            });
        } else {
            console.mongo('Error', 'Enroll problem duplicate username: ' + data.username)
            callback(null, username);
        }
    }

    function save_result(_email, callback) {
        if (_email == "ok") {
            bcrypt.hash(data.password, 10, function(err, hash) {
                if (err) {
                    console.mongo(err);
                    return (callback(err, null));
                }
                data.password = hash;
                data.favorite = [];
                data.permissions = ['favorite_list'];
                db.users.create(data, function(err) {
                    if (err) {
                        console.mongo('Error', err);
                        return (callback(err, null));
                    }
                    console.mongo('Info', 'New user has been enrolled username:' + data.username)
                    return (callback(null, "ok"));
                })
            });
        } else {
            console.mongo('Error', 'Enroll problem duplicate email: ' + data.email)
            return (callback(null, _email));
        }
    }
};
