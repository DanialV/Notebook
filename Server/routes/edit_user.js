var db = require("mongo_schemas");
var bcrypt = require("bcrypt");
var async = require("async");
var checkP = require('check_permissions');
module.exports.post = function(req,res){
  if(checkP(req,res,'edit_user'))return;
  data = req.body;
  async.waterfall([
    function(callback){
      let letterNumber = /^[a-z0-9]+$/i;
      if(typeof data.first_name == 'undefined' ||typeof data.last_name == 'undefined' ||
      typeof data.username == 'undefined' ||typeof data.email == 'undefined' || !data.username.match(letterNumber)){
        callback("FError");
      }
      else{
        callback(null);
      }
    },
    function(callback){
      if(data.username == data.pervious_username)callback(null);
      else{
          db.users.findOne({username : data.username},{username : true}).lean().exec(function(err,user_info){
            if(err){
              console.mongo(err);
              callback(err);
            }
            else{
               if(user_info != null)callback("UError");
               else callback(null);
            }

        });
      }
    },
    function(callback){
      if(data.password == data.repeat_password){
        if(data.password == ''){
          callback(null,"ok");
        }
        else{
          bcrypt.hash(data.password,10,function(err,hash){
            if(err){
              callback(err,null);
            }
            else{
              callback(null,hash);
            }
          });
        }
      }
      else{
        callback("PError",null);
      }
    },
    function(hash,callback){
      db.users.findOne({_id : data._id},{},function(err,user_data){
        if(err){
          console.mongo(err);
          callback(err,null);
        }
        else{
          user_data.first_name = data.first_name;
          user_data.last_name = data.last_name;
          user_data.username = data.username;
          user_data.email = data.email;
          if(hash != "ok" ){
            user_data.password  = hash;
          }
          user_data.role = data.role;
          user_data.save(function(err){
            if(err){
              console.mongo(err);
              callback(err,null);
            }
            else{
              callback(null,"ok");
            }
          });

        }
      });
    }
  ],function(err,result){
    if(err){
      if(err.match(/\Error/g)){
        res.send(err);
      }
      else res.sendStatus(500);
    }
    else res.send("ok");
  });
}
