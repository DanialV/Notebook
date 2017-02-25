let mongoose = require("mongoose");
let db = require('./Server/node_modules/mongo_schemas');
let async = require('async')
mongoose.connect('mongodb://localhost/118');
mongoose.Promise = global.Promise;

let database = mongoose.connection;

database.on('error', function(err) {
    console.log('Error : Mongo connection error'.red);
});
database.once('open', function() {});
let permissions = [{
    title: "لیست مورد علاقه",
    name: "favorite_list"
}, {
    title: "ویرایش شماره تلفن",
    name: "edit_phone"
}, {
    title: "حذف شماره تلفن",
    name: "delete_phone"
}, {
    title: "اضافه کردن شماره تلفن",
    name: "add_phone"
}, {
    title: "لاگ های سرور",
    name: "system_logs"
}, {
    title: "حذف کاربران",
    name: "delete_user"
}, {
    title: "ویرایش کاربران",
    name: "edit_user"
}, {
    title: "مدیریت لینک های خارجی",
    name: "external_link"
}, {
    title: "مشاهده شماره تلفن",
    name: "phone_number"
}, {
    title: "خروجی اکسل تمام شماره تلفن ها",
    name: "db_export"
}]
db.permissions.remove({}, (err) => {
    if (err) {
        return console.log("Mongo Error");
    }
    async.each(permissions, function(index, callback) {
        let temp = new db.permissions(index)
        temp.save(function(err) {
            if (err) {
                callback(err)
            } else {
                callback()
            }
        });
    }, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Done");
            mongoose.connection.close()
        }
    });
});
