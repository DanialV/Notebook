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
        let clean_data = (typeof req.body.search == 'undefined')?'':req.body.search.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        if(clean_data == ''){
            res.send({});
        }
        else{
          let main_q = { $or : [] };
          let name_q = { $and : [] };
          let dep_q = { $and : [] };

          let temp = clean_data.split(' ');

          temp.forEach(function(text){
            if(text){
              name_q.$and.push({ name : new RegExp(text,'i')});
              dep_q.$and.push({ departmenet : new RegExp(text,'i')});
            }
          })

          main_q.$or.push(name_q);
          main_q.$or.push(dep_q);

          [
            'departmenet',
            'inside_phone_number',
            'phone_number',
            'room_number',
            'email'
          ].forEach(function(db_field){

            let tt = {};
            tt[db_field] = new RegExp(clean_data,'i');
            main_q.$or.push(tt);
          })


            db.phones.find(main_q).sort({'name': 'asc'}).lean().exec(function(err,info){
                if(err){
                    console.mongo(err);
                    // res.statusCode = 500;
                    // res.sendStatus(500);
                    res.satuts(500).json({ err : true });
                }
                else{
                    res.send(info);
                }
            });
        }
    }
};
