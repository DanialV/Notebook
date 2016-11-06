/**
 * Created by danial on 9/17/16.
 */
var db  = require("mongo_schemas");
var async = require("async");
module.exports.post = function(req,res){
    var data = req.body;
    console.log(req.method);
    if(data.type == "add"){
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
            var id = data.id;
            db.phones.findOne({_id : id},{}).lean().exec(function(err,info){
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
    else if(data.type == "get_data") {
        async.waterfall([
            find_user,
            find_favorite
        ],function(err,result){
            if(err){
                res.sendStatus(500);
            }
            else{
                res.json(result);
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
    }

};
