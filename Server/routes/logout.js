/**
 * Created by danial on 9/17/16.
 */
module.exports.get = function (req,res) {
  req.session = null;
  res.json({'status':true});
};
