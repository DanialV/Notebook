const db = require('mongo_schemas');
const checkP = require('check_permissions');
const json2csv = require('json2csv');
module.exports.get = (req, res) => {
    db.phones.find({}, {
        _id: false,
        __v: false
    }).lean().exec((err, result) => {
        if (err) {
            console.mongo('Error', err);
            return res.sendStatus(500);
        }
        let field = ['name', 'departmenet', 'inside_phone_number', 'phone_number', 'email', 'room_number'];
        json2csv({
            data: result,
            fields: field
        }, function(err, csv) {
            if (err) {
                console.mongo('Error', err);
                return res.sendStatus(500);
            }
            res.setHeader('Content-disposition', 'attachment; filename=db_export.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        });

    });
}
