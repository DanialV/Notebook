var db = require('mongo_schemas');
var async = require('async')
module.exports.get = function(req, res) {
    let data = {
        'table_header': [],
        'permissions': []
    }
    if (typeof req.user == 'undefined') {
        res.json(data);
    } else {
        let permissions = ['favorite_list', 'phone_number', 'edit_phone', 'delete_phone']
        let title = {
            'favorite_list': 'مورد علاقه',
            'phone_number': 'شماره تلفن',
            'edit_phone': 'ویرایش',
            'delete_phone': 'حذف'
        }
        let user_permissions = req.user.permissions;
        async.each(user_permissions, function(index, callback) {
            if (permissions.indexOf(index) != -1) {
                data.table_header.push(title[index]);
                data.permissions.push(index);
            }
            callback();
        }, function() {
            res.send(data);
        });

    }
}
