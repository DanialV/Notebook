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
    'logout',
    'user_management'
];
var post_route = [
    'favorite',
    'deletenumber',
    'editnumber',
    'login' ,
    'add_phone',
    'enroll',
    'delfavorite',
    'user_management',
    'edit_user',
    'deluser',
];
module.exports = function(app){

    app.route('/').get(require('./core').get).post(require('./core').post);
    get_routes.forEach(function(index){
        try{
            _route.file_get(app,index);
        }
        catch (err){
            if(index == 'main_content')
                _route.render_get(app,index,1);
            else
                _route.render_get(app,index,0);
        }
    });
    post_route.forEach(function(index){
        _route.file_post(app,index);
    });

};
