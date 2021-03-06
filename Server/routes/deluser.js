var db = require("mongo_schemas");
var checkP = require('check_permissions');
module.exports.post = function(req, res) {
    var id = req.body._id;
    db.users.findOne({
        _id: id
    }, {}, function(err, data) {
        if (checkP(req, res, 'delete_user')) return;
        if (err) {
            console.mongo('Error', err);
            res.sendStatus(500);
        } else {
            data.remove(function(err) {
                if (err) {
                    console.mongo('Error', err);
                    res.sendStatus(500);
                } else {
                    console.mongo('Info', 'A user has been deleted by: ' + req.user.username);
                    res.send("ok");
                }
            });
        }
    });
}
