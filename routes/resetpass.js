let express= require('express');
let router = express.Router();
let model = require('../mongodb/userregi');
let bcrypt=require('bcryptjs')
let Joi=require('@hapi/joi')

router.post('/:token',async(req,res)=>{
    let user=await model.formmodel.findOne({resetpasswordtoken:req.params.token,
                                             resetpasswordexpires:{$gt:Date.now()}})
if(!user){
res.status(600).send("token Not found")
}
let{error}=validation(req.body)
if(error){
    return res.status(402).send(error.details[0].message)
}
let comparepass=await bcrypt.compare(user.userlogin.password,req.body.userlogin.password);
if(comparepass)
{
    return res.status(300).send('password is similar to the old one!!!')
}
user.userlogin.password=req.body.userlogin.password;
user.resetpasswordtoken=undefined;
user.resetpasswordexpires=undefined;
let salt=await bcrypt.genSalt(10);
user.userlogin.password=await bcrypt.hash(req.body.userlogin.password,salt)
let data=await user.save();
res.send({message:'Pasword reset successful',item:data})
})

function validation(msg){
    let schema=Joi.object().keys({
        userlogin:{
        password:Joi.string().required().min(3)
        }
    })
    return Joi.validate(msg,schema)
}
module.exports=router