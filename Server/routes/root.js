/**
 * Created by danial on 7/27/16.
 */
// catch 404 and forward to error handler
var error_handel = require("djs");
var route_permission = {
    '/favorite':1,
    '/deletenumber':2,
    'editnumber' : 2,
    '/': 0,
    '/logout':1,
    '/main_content' : 0,
    '/login':0,
    '/enroll':0,
    '/add_phone':2,
    'error':0,
    '/favicon.ico':0
};
module.exports = function(app){
    app.route('/*').get(function(req,res,next){
        if(typeof  req.session.role == 'undefined'){
            if(route_permission.hasOwnProperty(req.url)){
                if(route_permission[req.url] == 0){
                    next();
                }
                else {
                    error_handel.error_render(res,403, "اجازه مشاهده ی چنین صفحه ای رو ندارید!");
                }

            }
            else{
                error_handel.error_render(res,404, "چنین صفحه ای وجود ندارد!");
            }
        }
        else{
            if(route_permission.hasOwnProperty(req.url)){
                if(route_permission[req.url]  <= req.session.role +1){
                    next();
                }
                else{
                    error_handel.error_render(res,403, "اجازه مشاهده ی چنین صفحه ای رو ندارید!");
                }
            }
            else{
                error_handel.error_render(res,404, "چنین صفحه ای وجود ندارد!");
            }

        }

    });
    require('./dynamic_routes')(app);
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
