let mongoose = require("mongoose");
let db = require('./Server/node_modules/mongo_schemas');
let async = require('async')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/118');
let database = mongoose.connection;

database.on('error', function(err) {
    console.log('Error : Mongo connection error'.red);
    //    console.log(err);
});
async.waterfall([
    function(cb) {
        db.users.update({}, {
            $set: {
                permissions: ['favorite_list']
            }
        }, {
            multi: true
        }, function(err) {
            if (err) {
                return (cb(err, null));
            }
            cb(null, true);

        });
    },
    function(res, cb) {
        db.users.update({
            $or: [{
                username: 'DanialV'
            }, {
                username: 'somayeh'
            }]
        }, {
            $set: {
                permissions: ['favorite_list', 'edit_phone', 'delete_phone', 'add_phone',
                    'system_logs', 'delete_user', 'edit_user', 'external_link', 'phone_number'
                ]
            }
        }, {
            multi: true
        }, function(err) {
            if (err) {
                return (cb(err, null));
            }
            cb(null, true);

        });
    },
    function(res, cb) {
        db.users.update({}, {
            $unset: {
                'role': ''
            }
        }, {
            multi: true
        }, function(err) {
            if (err) {
                return (cb(err, null));
            }
            cb(null, true);

        });
    }
], function(err, res) {
    if (err) {
        return console.log(err);
    }
    console.log(res);
    database.close();
});
