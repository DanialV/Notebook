/**
 * Created by danial on 7/28/16.
 */
var _route = require("djs");
var get_routes = [
    'favorite',
    'main_content',
    'login' ,
    'add_phone',
    'enroll',
    'logout'
];
var post_route = [
    'favorite',
    'deletenumber',
    'editnumber',
    'login' ,
    'add_phone',
    'enroll',
    'delfavorite'
];
var check_session = {
    'main_content': 1,
    'login' :0,
    'add_phone':0,
    'enroll':0,
};
module.exports = function(app){

    app.route('/').get(require('./core').get).post(require('./core').post);
    get_routes.forEach(function(index){
        try{
            _route.file_get(app,index);
        }
        catch (err){
            if(check_session[index] == 1)
                _route.render_get(app,index,1);
            else
                _route.render_get(app,index,0);
        }
    });
    post_route.forEach(function(index){
        _route.file_post(app,index);
    });

};
