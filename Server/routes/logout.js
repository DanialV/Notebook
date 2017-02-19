/**
 * Created by danial on 9/17/16.
 */
module.exports.get = function(req, res) {
    req.session = null;
    console.mongo('Info', 'Username: ' + req.user.username + ' has been log out');
    res.json({
        'status': true
    });
};
