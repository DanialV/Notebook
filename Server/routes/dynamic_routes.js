/**
 * Created by danial on 7/28/16.
 */
var indexes = [
    'login',
    'add_phone'
];
module.exports = function(app){

      indexes.forEach(function(index){
            app.route('/' + index).get(function(req,res){
               res.render(index, {csrfToken : req.csrfToken()});
            }).post(require('./'+index).post);
      });
};