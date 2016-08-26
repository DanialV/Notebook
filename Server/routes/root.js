/**
 * Created by danial on 7/27/16.
 */
// catch 404 and forward to error handler

module.exports = function(app){
    app.route('/*').get(function(req,res,next){
        //here is very important spot
        next();
    });
    app.route('/').get(function(req,res){
        if(req.session.role == 'undefined'){
            if(req.xhr){
                res.render('index_ajax',{data : {version : global.init.version , role : 0}});

            }
            else res.render('index',{data : {version : global.init.version , role : 0}});
        }
        else{
            if(req.xhr){
                res.render('index_ajax',{data : {
                    version : global.init.version ,
                    role : req.session.role,
                    username : req.session.username
                }});
            }
            else{
                res.render('index',{data : {
                    version : global.init.version ,
                    role : req.session.role,
                    username : req.session.username
                }});
            }
        }
    });
    require('./dynamic_routes')(app);
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
