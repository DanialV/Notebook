/**
 * Created by danial on 9/17/16.
 */
var db = require('mongo_schemas');
let persian = require('persianjs');
module.exports.post = function(req, res) {
    var _data = req.body;
    var id = _data.finder;
    db.phones.findOne({
        _id: id
    }, {}, function(err, data) {

        if (err) {
            console.mongo(err);
            res.sendStatus(500);
        } else {
            data.name = (typeof _data.name != 'undefined') ? persian(_data.name).arabicChar().toString() : _data.name;
            data.departmenet = (typeof _data.departmenet != 'undefined') ? persian(_data.departmenet).arabicChar().toString() : _data.departmenet;
            data.phone_number = (typeof _data.phone_number != 'undefined') ? persian(_data.phone_number).englishNumber().toString() : _data.phone_number;
            data.inside_phone_number = (typeof _data.inside_phone_number != 'undefined') ? persian(_data.inside_phone_number).englishNumber().toString() : _data.inside_phone_number;
            data.email = _data.email;
            data.room_number = (typeof _data.room_number != 'undefined') ? persian(_data.room_number).englishNumber().toString() : _data.room_number;
            data.save(function(err) {
                if (err) {
                    console.mongo(err);
                    res.sendStatus(500);
                } else {
                    res.send("ok");
                }
            });
        }
    });

};
