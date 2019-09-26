const express=require('express')
const config=require('config')
const bcrypt=require('bcryptjs')
const router=express.Router()
const U=require('../mongodb/user-regi')
let Joi =require('@hapi/joi')
let jwt=require('jsonwebtoken')


router.post('/auth',async(req,res)=>{
let {error}=validationerror(req.body)
if(error){
    res.status(402).send(error.details[0].message)
}
let ok=await U.formmodel.find()
 let emailexist=await U.formmodel.findOne({'emailId':req.body.emailId})
 if(!emailexist){
    return res.status(402).send('Invalid emailID')
 }
let passmatch=await bcrypt.compare(req.body.userlogin.password,emailexist.userlogin.password)
if(!passmatch){
   return res.status(402).send('invalid')
}
let token=jwt.sign({_id:emailexist._id},config.get('jwtprivatekey'))
res.send({message:'Congo!!!!'/*,data:emailexist,email:ok*/,token:token})
})

function validationerror(msg) {
    let schema=Joi.object().keys({ 
        userlogin:{
         emailId:Joi.string().required(),
         password:Joi.string().required()
    }
    })
    return Joi.validate(msg,schema)
}

module.exports=router