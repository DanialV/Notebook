/**
 * Created by danial on 7/28/16.
 */
var indexes = [
    'login'
];
module.exports = function(app){

      indexes.forEach(function(index){
            app.route('/' + index).get(function(req,res){
               res.render(index);
            });
      });
};