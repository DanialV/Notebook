var checkP = require('check_permissions');
var db = require('mongo_schemas');
module.exports.post = function(req, res) {
    if (checkP(req, res, 'external_link')) return;
    let link_id = req.body;
    db.link.remove({
            _id: link_id._id
        },
        function(err) {
            if (err) {
                console.log('Error', err);
                return res.sendStatus(500);
            }
            res.json({
                status: true
            })
        });
}
