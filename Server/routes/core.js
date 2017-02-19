/**
 * Created by danial on 9/12/16.
 */
var db = require("mongo_schemas");
var persian = require('persianjs')
module.exports = {
    get: function(req, res) {
        res.render('index');
    },
    post: function(req, res) {
        let show = {}
        if (typeof req.user == 'undefined') {
            show.phone_number = false;
        } else {
            if (req.user.permissions.indexOf('phone_number') == -1)
                show.phone_number = false;
        }
        let clean_data = (typeof req.body.search == 'undefined') ? '' : req.body.search.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        clean_data = persian(clean_data).englishNumber().arabicChar().toString()
        if (clean_data == '') {
            res.send({});
        } else {
            let main_q = {
                $or: []
            };
            let name_q = {
                $and: []
            };
            let dep_q = {
                $and: []
            };

            let temp = clean_data.split(' ');

            temp.forEach(function(text) {
                if (text) {
                    name_q.$and.push({
                        name: new RegExp(text, 'i')
                    });
                    dep_q.$and.push({
                        departmenet: new RegExp(text, 'i')
                    });
                }
            })

            main_q.$or.push(name_q);
            main_q.$or.push(dep_q);

            [
                'departmenet',
                'inside_phone_number',
                'phone_number',
                'room_number',
                'email'
            ].forEach(function(db_field) {

                let tt = {};
                tt[db_field] = new RegExp(clean_data, 'i');
                main_q.$or.push(tt);
            })
            db.phones.find(main_q, show).sort({
                'name': 'asc'
            }).lean().exec(function(err, info) {
                if (err) {
                    console.mongo('Error', err);
                    res.sendStatus(500);
                } else {
                    res.json(info);
                }
            });
        }
    }
};
