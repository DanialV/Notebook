/**
 * Created by danial on 8/26/16.
 */
var db  = require("mongo_schemas");
module.exports.post = function(req,res){
    var data = req.body;
    async.waterfall([
        check_name,
        check_number,
        check_inside_number,
        save_res
    ], function (err, result) {

    });
    function check_name(callback){
        db.phones.count({name : data.name},function(err,number){
            if(err){
                console.mongo(err);
                callback(err,null);
            }
            else{
                if(number == 0){
                    callback(null,true);
                }
                else callback(null,false);
            }
        });
    }
    function check_number(pre_res,callback){
        if(pre_res == true){
            db.phones.count({phone_number : data.number},function(err,number){
                if(err){
                    console.mongo(err);
                    callback(err,null);
                }
                else{
                    if(number == 0){
                        callback(null,true);
                    }
                    else callback(null,false);
                }
            });
        }
        else{
            res.send("duplicate_name");
        }
    }
    function check_inside_number(pre_res,callback){
        if(pre_res == true){
            db.phones.count({inside_phone_number : data.inside_number},function(err,number){
                if(err){
                    console.mongo(err);
                    callback(err,null);
                }
                else{
                    if(number == 0){
                        callback(null,true);
                    }
                    else callback(null,false);
                }
            });
        }
        else{
            res.send("duplicate_number");
        }
    }
    function save_res(pre_res,callback){
        if(pre_res == true){
            console.log("ok save it");
            
        }
        else{
            res.send("duplicate_inside_number");
        }
    }

    
    
};