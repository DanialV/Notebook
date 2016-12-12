let mongoose = require("mongoose");
let db = require('./Server/node_modules/mongo_schemas');
let persian_number = require('persianjs');
let async = require('async');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + '118');
let database = mongoose.connection;

database.on('error', function (err) {
  console.log('Error : Mongo connection error'.red);
//    console.log(err);
});
database.once('open', function (){});
function _englishNumber(value) {
      if (!value) {
          return;
      }

      var persianNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          englishNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

      for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
          value = value.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
      }
      return value;
  }
db.phones.find(function(err,info){
  async.each(info,
    function(index,callback){
      index.name = persian_number(index.name).arabicChar().englishNumber().toString();
      index.departmenet = persian_number(index.departmenet).arabicChar().englishNumber().toString();
      if(index.phone_number != '' && index.phone_number != null)index.phone_number = persian_number(index.phone_number).englishNumber().toString();
      index.inside_phone_number = persian_number(index.inside_phone_number).englishNumber().toString();
      if(typeof index.room_number != 'undefined')index.room_number = persian_number(index.room_number).englishNumber().toString();
      var object = new db.phones(index);
      object.save(function(err){
          if(err)callback(err);
          callback(null);
      });
  },function(err){
      if(err)console.log(err);
      else console.log("Done");
  });
});
