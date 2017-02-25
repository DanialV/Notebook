/**
 * Created by danial on 7/28/16.
 */
//TODO: add Logs post route and user edit profile
var _route = require("djs");
var get_routes = [
    'get_menu',
    'main_content',
    'logout',
    'user_management',
    'external_link',
    'logs',
    'db_export'
];
var post_route = [
    'favorite',
    'deletenumber',
    'editnumber',
    'login',
    'add_phone',
    'enroll',
    'delfavorite',
    'edit_user',
    'deluser',
    'forget_password',
    'external_link',
    'delete_link'
];
module.exports = function(app) {
    app.route('/').get(require('./core').get).post(require('./core').post);
    get_routes.forEach(function(index) {
        _route.file_get(app, index);
    });
    post_route.forEach(function(index) {
        _route.file_post(app, index);
    });
};
