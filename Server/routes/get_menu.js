let db = require('mongo_schemas')
let async = require('async')
module.exports.get = function(req, res) {
    if (typeof req.user == 'undefined') {
        let data = [{
            'href': '#!/login/',
            'class': 'loginActive',
            'value': 'ورود',
            'icon': 'fa fa-sign-in'
        }, {
            'href': '#!/enroll',
            'class': 'enrollActive',
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
            'class': 'enrollActive',
            'value': 'ثبت نام',
            'icon': 'fa fa-user-plus'
        }]
        let check_user_managment = null;
        async.each(permssions, function(index, callback) {
            if (index == "favorite_list") {
                data.push({
                    'href': '#!/favorite',
                    'class': 'favoriteActive',
                    'value': 'لیست مورد علاقه',
                    'icon': 'fa fa-heart'
                });
            }
            if (index == "add_phone") {
                data.push({
                    'href': '#!/add_phone',
                    'class': 'add_phoneActive',
                    'value': 'اضافه کردن شماره تلفن',
                    'icon': 'fa fa-phone-square'
                });
            }
            if ((index == "edit_user" || index == "delete_user") && check_user_managment == null) {
                check_user_managment = index;
                data.push({
                    'href': '#!/user_management',
                    'class': 'usermanagmentActive',
                    'value': 'مدیریت کاربران',
                    'icon': 'fa fa-users'
                });
            }
            if (index == "system_logs") {
                data.push({
                    'href': '#!/logs',
                    'class': 'logsActive',
                    'value': 'لاگ های سرور',
                    'icon': 'fa fa-cogs'
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
