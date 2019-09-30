let nodemailer = require('nodemailer');
let express= require('express');
let router = express.Router();
let model = require('../mongodb/userregi');
let crypto=require('crypto')


router.post('/mail',async(req,res)=>{
    let token=crypto.randomBytes(32).toString('hex');
    let user=await model.formmodel.findOne({"userlogin.emailId":req.body.userlogin.emailId})
    if(!user){
        return req.status(500).send('email not found')
    }
    user.resetpasswordtoken=token;
    user.resetpasswordexpires=Date.now() + 3600000;
    user= await user.save();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'bordekardarshan@gmail.com',
            pass: 'XXXXXXXX'
          },
          tls: {rejectUnauthorized: false},
        debug:true
    });
    
    if (!transporter) res.status(401).send({
        message: 'something went wrong'
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Test NodeMailer :" <bordekardarshan@gmail.com>', // sender address
        to: user.userlogin.emailId, // list of receivers
        subject: 'Reset Your Password', // Subject line:smile:
        text: 'open this link to change your password http://localhost:4200/forgotpassword/' + token // plain text body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    
    res.send({message:"please check your mail box"})
    });
    
   module.exports = router;