/**
 * Created by danial on 8/26/16.
 */
var db  = require("mongo_schemas");
var async = require("async");
module.exports.post = function(req,res){
    var data = req.body;
    async.waterfall([
        check_name,
        check_number,
        check_inside_number,
        save_res
    ], function (err, result) {
        if(err){
            res.statusCode = 500;
            res.sendStatus(500);
        }
        else{
            res.send(result);
        }
    });
    function check_name(callback){
        db.phones.count({name : data.name},function(err,number){
            if(err){
                console.mongo(err);
                callback(err,null);
            }
            else{
                if(number == 0){
                    callback(null,"ok");
                }
                else callback(null,"duplicate_name");
            }
        });
    }
    function check_number(pre_res,callback){
        if(pre_res == "ok"){
            db.phones.count({phone_number : data.phone_number},function(err,number){
                if(err){
                    console.mongo(err);
                    callback(err,null);
                }
                else{
                    if(number == 0){
                        callback(null,"ok");
                    }
                    else callback(null,"duplicate_number");
                }
            });
        }
        else{
            callback(null,pre_res);
        }
    }
    function check_inside_number(pre_res,callback){
        if(pre_res == "ok"){
            db.phones.count({inside_phone_number : data.inside_phone_number},function(err,number){
                if(err){
                    console.mongo(err);
                    callback(err,null);
                }
                else{
                    if(number == 0){
                        callback(null,"ok");
                    }
                    else callback(null,"duplicate_inside_number");
                }
            });
        }
        else{
            callback(null,pre_res);
        }
    }
    function save_res(pre_res,callback){
        if(pre_res == "ok"){
            var _data = new db.phones(data);
            _data.save(function(err){
                if(err){
                    console.mongo(err);
                    callback(err,null);
                }
                else{
                    callback(null,"ok");
                }
            });

        }
        else{
            callback(null,pre_res);
        }
    }
};