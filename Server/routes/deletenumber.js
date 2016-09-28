/**
 * Created by danial on 9/17/16.
 */
var db = require("mongo_schemas");
module.exports.post = function(req,res){

    var phoneNumber = req.body.phone_number;
    db.phones.findOne({phone_number:phoneNumber},{},function(err,data){
       if(err){
           console.mongo(err);
           console.error(err);
           res.sendStatus(500);
       }
        else {
           data.remove(function(err){
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