/**
 * Created by danial on 9/12/16.
 */
var db = require("mongo_schemas");
module.exports = {
    get:function(req,res){
        var permission = (typeof req.session.role == 'undefined')?0:req.session.role;
        if(typeof req.session.role == 'undefined'){
            res.render('index',{data : {
                version : global.init.version ,
                role : permission
            }});
        }
        else{
            res.render('index',{data : {
                version : global.init.version ,
                role : permission,
                username : req.session.username,
                name : req.session.name
            }});
        }
    },
    post:function(req,res){
        var clean_data = (typeof req.body.search == 'undefined')?'':req.body.search.replace(/[\`|=^#!~&;$%@"<>()+/*\[\],]/g, "");
        if(clean_data == ''){
            res.send({});
        }
        else{
            var query = new RegExp(clean_data,'i');
            db.phones.find( { $or:[ {'name':query}, {'departmenet':query}, {'inside_phone_number':query},{'phone_number':query},{'email':query},{'room_number':query} ]},{}).sort({'name': 'asc'}).lean().exec(function(err,info){
                if(err){
                    console.mongo(err);
                    res.statusCode = 500;
                    res.sendStatus(500);
                }
                else{
                    res.send(info);
                }
            });
        }
    }
};
