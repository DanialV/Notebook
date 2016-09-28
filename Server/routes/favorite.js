/**
 * Created by danial on 9/17/16.
 */
var db  = require("mongo_schemas");
var error_handel = require("djs");
var async = require("async");
module.exports = {
    get : function(req,res){
        async.waterfall([
            find_user,
            find_favorite
        ],function(err,result){
            if(err){
                error_handel.error_render(res,"500","اشکال داخلی سرور.");
            }
            else{
                res.render('favorite',{data:result});
            }
        });
        function find_user(callback){
            var name = req.session.username;
            db.users.findOne({username : name},{_id:false}).lean().exec(function(err,_data){
                if(err){
                    console.mongo(err);
                    console.error(err);
                    callback(err,null);
                }
                else{
                    callback(null,_data.favorite);
                }
            });
        }
        function find_favorite(favorite,callback){
            db.phones.find({_id:{$in : favorite}},{}).lean().exec(function(err,data){
                if(err){
                    console.mongo(err);
                    console.error(err);
                    callback(err,null);
                }
                else{
                    callback(null,data);
                }
            });
        }


    },
    post:function(req,res){
        var data = req.body;
        async.waterfall([
           find_phone,
            add_to_favorite
        ],function(err,result){
            if(err){
                res.sendStatus(500);
            }
            else{
                res.send(result);
            }
        });
        function find_phone(callback){
            var phoneNumber = data.phone_number;
            db.phones.findOne({phone_number : phoneNumber},{}).lean().exec(function(err,info){
               if(err){
                   console.mongo(err);
                   console.error(err);
                   callback(err,null);
               }
                else{
                   callback(null,info._id);
               }
            });
        }
        function add_to_favorite(_id,callback){
            var name = req.session.username;
            db.users.findOne({username : name},{},function(err,info){
               if(err){
                   console.mongo(err);
                   console.error(err);
                   callback(err,null);
               }
                else{
                   if(info.favorite.indexOf(_id) == -1){
                       info.favorite.push(_id);
                       console.log(info.favorite);
                       info.save(function(err){
                           if(err){
                               console.mongo(err);
                               console.error(err);
                               callback(err,null);
                           }
                           else{
                               callback(null,true);
                           }
                       });
                   }
                   else{
                       callback(null,false);
                   }
                  
               }
            });

        }
    }
};