/**
 * Created by danial on 9/17/16.
 */
var db = require('mongo_schemas');
module.exports.post = function(req,res){
    var _data = req.body;
    var id = _data.finder;
    db.phones.findOne({_id : id},{},function(err,data){

        if(err){
            console.mongo(err);
            res.sendStatus(500);
        }
        else{
           data.name = _data.name;
           data.departmenet = _data.departmenet;
           data.phone_number = _data.phone_number;
           data.inside_phone_number = _data.inside_phone_number;
           data.save(function(err){
               if(err){
                   console.mongo(err);
                   console.error(err);
                   res.sendStatus(500);
               }
               else{
                   res.send("ok");
               }
           });
        }
    });

};
