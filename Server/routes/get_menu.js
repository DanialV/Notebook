let db = require('mongo_schemas')
let async = require('async')
module.exports.get = function(req,res){
    if (req.session == null) {
        let data = [{
            'href': '#/login',
            'class': 'loginActive',
            'value': 'ورود'
        }, {
            'href': '#/enroll',
            'class': 'enrollActive',
            'value': 'ثبت نام'
        }, ]
        let send_data = {
          'data':data,
          'version':global.init.version,
          'username':false
        }
        res.send(send_data);
    } else {
        db.users.findOne({
            username: req.session.username
        }).lean().exec(function(err, data) {
            if (err) {
                res.sendStatus(err);
                console.mongo('error', err);
            } else {
                let permssions = data.permissions;
                var data = [{
                  'href': '#/enroll',
                  'class': 'enrollActive',
                  'value': 'ثبت نام'
                }]
                async.each(permssions,function(index,callback){
                  if(index == "favorite_list"){
                    data.push({
                      'href': '#/favorite',
                      'class': 'favoriteActive',
                      'value': 'لیست مورد علاقه'
                    })
                  }
                  if(index == "add_phone"){
                    data.push({
                      'href': '#/add_phone',
                      'class': 'add_phoneActive',
                      'value': 'اضافه کردن شماره تلفن'
                    })
                  }
                  if(index == "user_managment"){
                    data.push({
                      'href': '#/user_management',
                      'class': 'usermanagmentActive',
                      'value': 'مدیریت کاربران'
                    })
                  }
                  if(index == "system_logs"){
                    data.push({
                      'href': '#/logs',
                      'class': 'logsActive',
                      'value': 'لاگ های سرور'
                    })
                  }
                  callback()
                },function(){
                  let send_data = {
                    'data':data,
                    'version':global.init.version,
                    'username':req.session.name
                  }
                  res.send(send_data)
                });
            }
        });
    }
};
