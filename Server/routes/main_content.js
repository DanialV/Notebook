module.exports.get = function(req,res){
  let data = {
    'table_header':[' مورد علاقه','نام/نام‌خانوادگی','سمت','شماره‌تلفن','شماره داخلی','ایمیل','شماره اتاق']

  }
  res.send(data)
}
