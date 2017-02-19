var db = require('mongo_schemas');
module.exports.get = function(req, res) {
    if (typeof req.user == 'undefined') {
        console.mongo('Security', 'Access Denied ' + req.url);
        return res.status(403).json({
            'status': 403
        });
    }
    let permissions = req.user.permissions;
    if (permissions.indexOf('edit_user') == -1 && permissions.indexOf('delete_user') == -1) {
        console.mongo('Security', 'User: ' + req.user.username + ' Access Denied ' + req.url);
        return res.status(403).json({
            'status': 403
        });
    }
    db.users.find({}, {
        favorite: false,
        __v: false
    }).lean().exec(function(err, info) {
        if (err) {
            console.mongo('Error', err);
            return res.sendStatus(500);
        }
        db.permissions.find().lean().exec(function(err, per) {
            if (err) {
                console.mongo('Error', err);
                return res.sendStatus(500);
            }
            let respond_data = {
                user_info: info,
                permission_title: per
            }
            res.send(respond_data);

        });

    });
};
