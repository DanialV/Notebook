let db = require('mongo_schemas')
let async = require('async')
module.exports.get = function(req, res) {
    if (typeof req.user == 'undefined') {
        let data = [{
            'href': '#!/login/',
            'value': 'ورود',
            'icon': 'fa fa-sign-in'
        }, {
            'href': '#!/enroll',
            'value': 'ثبت نام',
            'icon': 'fa fa-user-plus'
        }, ]
        let send_data = {
            'data': data,
            'version': global.init.version,
            'username': false,
            'premissions': []
        }
        res.send(send_data);
    } else {
        let permssions = req.user.permissions;
        var data = [{
            'href': '#!/enroll',
            'value': 'ثبت نام',
            'icon': 'fa fa-user-plus'
        }]
        let check_user_managment = null;
        async.each(permssions, function(index, callback) {
            if (index == "favorite_list") {
                data.push({
                    'href': '#!/favorite',
                    'value': 'لیست مورد علاقه',
                    'icon': 'fa fa-heart'
                });
            }
            if (index == "add_phone") {
                data.push({
                    'href': '#!/add_phone',
                    'value': 'اضافه کردن شماره تلفن',
                    'icon': 'fa fa-phone-square'
                });
            }
            if ((index == "edit_user" || index == "delete_user") && check_user_managment == null) {
                check_user_managment = index;
                data.push({
                    'href': '#!/user_management',
                    'value': 'مدیریت کاربران',
                    'icon': 'fa fa-users'
                });
            }
            if (index == "system_logs") {
                data.push({
                    'href': '#!/logs',
                    'value': 'لاگ های سرور',
                    'icon': 'fa fa-cogs'
                });
            }
            if (index == "db_export") {
                data.push({
                    'href': '/db_export',
                    'value': 'خروجی اکسل تمام شماره‌تلفن‌ها',
                    'icon': 'fa fa-file-excel-o'
                });
            }
            callback()
        }, function() {
            let send_data = {
                'data': data,
                'version': global.init.version,
                'username': req.user.name,
                'premissions': permssions
            }
            res.send(send_data)
        });
    }
};
