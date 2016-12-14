/**
 * Created by danial on 7/28/16.
 */
 //TODO: add Logs post route and user edit profile
var _route = require("djs");
var get_routes = [
    'get_menu',
    'main_content'
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
    'forget_password'
];
module.exports = function(app){
    app.route('/').get(require('./core').get).post(require('./core').post);
    get_routes.forEach(function(index){
        _route.file_get(app,index);
    });
    post_route.forEach(function(index){
        _route.file_post(app,index);
    });
};
