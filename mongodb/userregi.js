const mongoose = require('mongoose')
const Joi=require('@hapi/joi')
const jwt =require('jsonwebtoken')
const config=require('config')

  let formschema= new mongoose.Schema({
      firstname:{type:String,required:true},
      lastname:{type:String,required:true},
      userId:{type:String,required:true},
      userlogin:{
          emailId:{type:String,required:true},
          password:{type:String,required:true}
      },
      resetpasswordtoken:{type:String},
      resetpasswordexpires:{type:Date},
      address:{
          city:{type:String,required:true},
          state:{type:String,required:true},
          pincode:{type:Number,required:true}
      },
      mobileno:{type:Number,required:true},
      isadmin:{type:Boolean}


  })
  formschema.methods.uservalidationtoken=function(){
    let token=jwt.sign({_id:this._id,isadmin:this.isadmin},config.get('jwtprivatekey'))
    return token
  }

  let fileschema=new mongoose.Schema({
      image:{type:String,required:true}
  })

  let formmodel=mongoose.model('Registration',formschema)
  let filemodel=mongoose.model('File',fileschema)

  function validationError(reqbodyparameter){
      let Schema=Joi.object().keys({
        firstname:Joi.string().min(3).max(20).required(),
        lastname:Joi.string().min(3).max(20).required(),
        userId:Joi.number().required(),
        userlogin:{
            emailId:Joi.string().required(),
            password:Joi.string().required()
        },
        address:{
            city:Joi.string().min(4).max(20).required(),
            state:Joi.string().min(4).max(20).required(),
            pincode:Joi.number().required()
        },
        mobileno:Joi.number().required()
      })
      return Joi.validate(reqbodyparameter,Schema)
  }

module.exports={formmodel,validationError,filemodel}