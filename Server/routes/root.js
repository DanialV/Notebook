/**
 * Created by danial on 7/27/16.
 */
 //PLANNING: change the Site UI
var error_handel = require("djs");
var route_permission = {
    '/favorite':1,
    '/delfavorite':1,
    '/deletenumber':2,
    '/editnumber' : 2,
    '/': 0,
    '/logout':1,
    '/main_content' : 0,
    '/login':0,
    '/forget_password':0,
    '/enroll':0,
    '/add_phone':2,
    '/favicon.ico':0,
    '/user_management':0,
    '/edit_user':2,
    '/deluser':2,
    '/logs':2
};
module.exports = function(app){
    app.route('/*').get(function(req,res,next){
      var permission = (typeof  req.session.role == 'undefined')?0:req.session.role;
      if(route_permission.hasOwnProperty(req.url)){
        //user permission
        if(permission >= route_permission[req.url]){
          next();
        }
        else{
          //security error
          console.monog('security',req.url)
          error_handel.error_render(res,403, "اجازه مشاهده ی چنین صفحه ای رو ندارید!");
        }
      }
      else{
        // 404
        //info logs
          console.monog('info','Not Found '+req.url)
        error_handel.error_render(res,404, "چنین صفحه ای وجود ندارد!");
      }
    }).post(function(req,res,next){
      var permission = (typeof  req.session.role == 'undefined')?0:req.session.role;
      if(route_permission.hasOwnProperty(req.url)){
        //user permission
        if(permission >= route_permission[req.url]){
          next();
        }
        else{
          console.monog('security',req.url)
          error_handel.error_render(res,403, "اجازه مشاهده ی چنین صفحه ای رو ندارید!");
        }
      }
      else{
        // 404
        console.monog('info','Not Found '+req.url)
        error_handel.error_render(res,404, "چنین صفحه ای وجود ندارد!");
      }
    });
    require('./dynamic_routes')(app);
// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                data : {
                    status_code: (err.status || 500),
                    status_massage: err.message,
                    'version' : global.init.version
                }
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            status_code: (err.status || 500),
            status_massage: "Internal Server Error",
            'version' : global.init.version

        });
    });
};
