let mongoose = require("mongoose");
let db = require('./Server/node_modules/mongo_schemas');
let async = require('async')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/118');
let database = mongoose.connection;

database.on('error', function (err) {
  console.log('Error : Mongo connection error'.red);
//    console.log(err);
});
database.once('open', function (){});
let permissions = [
  {
    title:"لیست مورد علاقه",
    name:"favorite_list"
  },
  {
    title:"ویرایش شماره تلفن",
    name:"edit_phone"
  },
  {
    title:"حذف شماره تلفن",
    name:"delete_phone"
  },
  {
    title:"اضافه کردن شماره تلفن",
    name:"add_phone"
  },
  {
    title:"لاگ های سرور",
    name:"system_logs"
  },
  {
    title:"مدیریت کاربران",
    name:"user_managment"
  }
]
async.each(permissions,function(index,callback){
  let temp = new db.permissions(index)
  temp.save(function(err){
    if(err){
      callback(err)
    }
    else{
      callback()
    }
  });
},function(err){
  if(err){
    console.log(err)
  }
  else{
    console.log("Done")
    mongoose.connection.close()
  }
});