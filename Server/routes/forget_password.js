var db = require("mongo_schemas");
// var nodemailer = require('nodemailer');
//TODO: get 118 email for miss eslami
module.exports.post = function(req, res) {
    db.findOne({
        email: req.body.email
    }).lean().exec(function(err, info) {
        if (err) {
            console.mongo('error', err);
            res.sendStatus(500)
        } else {
            if (info != null) {
                res.send("not_found");
            } else {
              //todo:get 118 email
                // let transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
                // let mailOptions = {
                //     from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
                //     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
                //     subject: 'Hello ✔', // Subject line
                //     text: 'Hello world 🐴', // plaintext body
                //     html: '<b>Hello world 🐴</b>' // html body
                // };
                //
                // // send mail with defined transport object
                // transporter.sendMail(mailOptions, function(error, info) {
                //     if (error) {
                //         return console.log(error);
                //     }
                //     console.log('Message sent: ' + info.response);
                // });
            }
        }
    });
};
