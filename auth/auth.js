const express=require('express')
const config=require('config')
const bcrypt=require('bcryptjs')
const router=express.Router()
const U=require('../mongodb/userregi')
let Joi =require('@hapi/joi')
let jwt=require('jsonwebtoken')
let authmid=require('../middleware/authorization')

router.post('/auth',authmid,async(req,res)=>{
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
// let token=jwt.sign({_id:emailexist._id},config.get('jwtprivatekey'))   //Create a Token Of that respecting user. Static Way

let token=emailexist.uservalidationtoken();
//res.header('x-auth-token',token).send({message:'Congo!!!!'/*,data:emailexist,email:ok*/})

//res.send({message:'Congo!!!!'})

res.send({message:'Congo!!!!'/*,data:emailexist*/,token:token})


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