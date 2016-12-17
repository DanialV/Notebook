/**
 * Created by danial on 8/26/16.
 */
var db = require("mongo_schemas");
var ascync = require("async");
var bcrypt = require("bcrypt");
module.exports.post = function(req,res){
    var data = req.body;
    ascync.waterfall([
        check_username,
        check_password
    ],function(err,result){
        if(err){
            res.statusCode = 500;
            res.sendStatus(500);
        }
        else res.send(result);
    });
    function check_username(callback){
        db.users.count({username : data.username},function(err,number){
           if(err){
               console.mongo(err);
               callback(err,null);
           }
            else{
               if(number)callback(null,true);
               else callback(null,false);
           }
        });
    }
    function check_password(_check_username,callback){
        if(!_check_username){
            callback(null,false);
        }
        else{
            db.users.findOne({username : data.username},{}).lean().exec(function(err,user_data){
                if(err){
                    console.mongo(err);
                    callback(err,null);
                }
                else{
                    bcrypt.compare(data.password,user_data.password,function(err,hash_res){
                       if(err){
                           console.mongo(err);
                           callback(err,null);
                       }
                        else{
                           if(hash_res){
                               req.session._id = user_data._id;
                               callback(null,true);
                           }
                           else callback(null,false);
                       }
                    });
                }
            });
        }
    }
};
