/**
 * Created by danial on 9/9/16.
 */
var db = require("mongo_schemas");
var async = require("async");
var bcrypt = require("bcrypt");
module.exports.post = function(req,res){
  var data = req.body;
    async.waterfall([
        check_username,
        check_email,
        save_result
    ],function(err,result){
        if(err){
            res.statusCode = 500;
            res.sendStatus(500);
        }
        else {
            res.send(result);
        }
    });
    function check_username(callback){
        db.users.count({username:data.username}).lean().exec(function(err,username){
           if(err){
               console.mongo(err);
               callback(err,null);
           }
            else{
               if(username)callback(null,"duplicate_username");
               else callback(null,"ok");
           }
        });
    }
    function check_email(username,callback){
        if(username == "ok") {
            db.users.count({email: data.email}).lean().exec(function (err, username) {
                if (err) {
                    console.mongo(err);
                    callback(err, null);
                }
                else {
                    if (username)callback(null, "duplicate_email");
                    else callback(null, "ok");
                }
            });
        }
        else{
            callback(null,username);
        }
    }
    function save_result(_email,callback){
        if(_email == "ok"){
            data.role = 0;
            bcrypt.hash(data.password,10,function(err,hash){
                if(err){
                    console.mongo(err);
                    callback(err, null);
                }
                else{
                    data.password = hash;
                    data.favorite = [];
                    var saveModule = new db.users(data);
                    saveModule.save(function(err){
                        if(err){
                            console.mongo(err);
                            callback(err,null);
                        }
                        else callback(null,"ok");
                    });
                }
            });
        }
        else{
            callback(null,_email);
        }
    }
};