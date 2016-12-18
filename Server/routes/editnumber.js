/**
 * Created by danial on 9/17/16.
 */
var db = require('mongo_schemas');
let persian = require('persianjs');
var checkP = require('check_permissions');
module.exports.post = function(req, res) {
    if(checkP(req,res,'edit_phone'))return;
    var _data = req.body;
    if(typeof _data.name == 'undefined')_data.name = '';
    if(typeof _data.departmenet == 'undefined')_data.departmenet = '';
    if(typeof _data.phone_number == 'undefined')_data.phone_number = '';
    if(typeof _data.inside_phone_number == 'undefined')_data.inside_phone_number = '';
    if(typeof _data.room_number == 'undefined')_data.room_number = '';
    var id = _data.finder;
    db.phones.findOne({
        _id: id
    }, {}, function(err, data) {
        if (err) {
            console.mongo('Error',err);
            res.sendStatus(500);
        } else {
            data.name = (_data.name != '') ? persian(_data.name).arabicChar().englishNumber().toString() : _data.name;
            data.departmenet = (_data.departmenet != '') ? persian(_data.departmenet).arabicChar().englishNumber().toString() : _data.departmenet;
            data.phone_number = (_data.phone_number != '') ? persian(_data.phone_number).englishNumber().toString() : _data.phone_number;
            data.inside_phone_number = (_data.inside_phone_number != '') ? persian(_data.inside_phone_number).englishNumber().toString() : _data.inside_phone_number;
            data.email = _data.email;
            data.room_number = (_data.room_number != '') ? persian(_data.room_number).englishNumber().toString() : _data.room_number;
            data.save(function(err) {
                if (err) {
                    console.mongo('Error',err);
                    res.sendStatus(500);
                } else {
                    res.send("ok");
                }
            });
        }
    });
};
