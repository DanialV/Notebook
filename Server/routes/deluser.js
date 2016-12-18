var db = require("mongo_schemas");
var checkP = require('check_permissions');
module.exports.post = function(req,res){
  var id = req.body._id;
  db.users.findOne({_id:id},{},function(err,data){
    if(checkP(req,res,'delete_user'))return;
     if(err){
         console.mongo(err);
         res.sendStatus(500);
     }
      else {
         data.remove(function(err){
            if(err){
                console.mongo(err);
                res.sendStatus(500);
            }
             else{
                res.send("ok");
            }
         });
     }
  });
}
