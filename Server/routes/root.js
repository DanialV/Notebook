/**
 * Created by danial on 7/27/16.
 */
//PLANNING: change the Site UI
var error_handel = require("djs");
var db = require('mongo_schemas');

function handel_permissions(req, res,next) {
    if (typeof req.session._id != 'undefined') {
        db.users.findOne({
            _id: req.session._id
        }, {}).lean().exec(function(err, data) {
            if (err) {
                console.mongo('Error', err);
                return;
            }
            req.user = {};
            req.user.permissions = data.permissions;
            req.user.username = data.username;
            req.user.name = data.first_name + ' ' + data.last_name;
            next();
        });
    }
    else{
        next();
    }
    // cosole.mongo('Security', 'Access Deined' + req.url);
    // error_handel.error_render(res, 403, "اجازه دسترسی به این صفحه را ندارین");
}
module.exports = function(app) {
    app.route('/*').get(function(req, res, next) {
        handel_permissions(req,res,next);
    }).post(function(req, res, next) {
        handel_permissions(req,res,next);
    });
    require('./dynamic_routes')(app);
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
          console.mongo('Error',err);
            res.status(err.status || 500);
            res.render('error', {
                data: {
                    status_code: (err.status || 500),
                    status_massage: err.message,
                    'version': global.init.version
                }
            });
        });
    }
    app.use(function(err, req, res, next) {
        console.mongo('Error',err);
        res.status(err.status || 500);
        res.render('error', {
            status_code: (err.status || 500),
            status_massage: "Internal Server Error",
            'version': global.init.version

        });
    });
};
