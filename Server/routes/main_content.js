var db = require('mongo_schemas');
module.exports.get = function(req,res){
  let data = {
    'table_header':[' مورد علاقه','نام/نام‌خانوادگی','سمت','شماره‌تلفن','شماره داخلی','ایمیل','شماره اتاق']
  }
  if(typeof req.session.username == 'undefined'){
      
      res.send()
  }
  else{

  }


}
