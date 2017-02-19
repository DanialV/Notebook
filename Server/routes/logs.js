var db = require("mongo_schemas");
var checkP = require('check_permissions');
var async = require('async');
module.exports.get = function(req, res) {
    if (checkP(req, res, 'system_logs')) return;
    async.parallel([
        function(cb) {
            db.logs.find({
                type: 'Error'
            }).lean().exec(function(err, info) {
                if (err) {
                    return (cb(err, null));
                }
                return (cb(null, info));
            });
        },
        function(cb) {
            db.logs.find({
                type: 'Info'
            }).lean().exec(function(err, info) {
                if (err) {
                    return (cb(err, null));
                }
                return (cb(null, info));
            });
        }
    ], function(err, out) {
        if (err) {
            res.sendStatus(500);
            return console.mongo('Error', err);
        }
        let result = {
            'info': out[1],
            'Error': out[0]
        }
        res.json(result);
    })

};
