var db = require('mongo_schemas');
module.exports.post = function(req,res){
  db.users.find({},{favorite:false , __v:false}).lean().exec(function(err,info){
    if(err){
      console.mongo(err);
      res.sendStatus(500);
    }
    else{
      res.send(info);
    }
  });
};
