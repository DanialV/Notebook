var checkP = require('check_permissions');
var db = require('mongo_schemas');
module.exports = {
    get: function(req, res) {
        if (checkP(req, res, 'external_link')) return;
        db.link.find().lean().exec(function(err, info) {
            if (err) {
                console.log('Error', err);
                return res.sendStatus(500);
            }
            res.send(info);
        });

    },
    post: function(req, res) {
        if (checkP(req, res, 'external_link')) return;
        let data = req.body;
        console.log(data);
        db.link.create(data, function(err) {
            if (err) {
                console.log('Error', err);
                return res.sendStatus(500);
            }
            res.json({
                status: true
            })
        });
    }
}
