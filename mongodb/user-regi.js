const mongoose = require('mongoose')
const joi=require('@hapi/joi')
mongoose.connect('mongodb://localhost/UserRegistration',{
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(()=>{
      console.log("Successful")
  }).catch((err)=>{
    console.log("Not Successful",err)
})

  let formschema= new mongoose.Schema({
      firstname:{type:String,required:true},
      lastname:{type:String,required:true},
      userId:{type:String,required:true},
      userlogin:{
          emailId:{type:String,required:true},
          password:{type:String,required:true}
      },
      address:{
          city:{type:String,required:true},
          state:{type:String,required:true},
          pincode:{type:Number,required:true}
      },
      mobileno:{type:Number,required:true}

  })

  let formmodel=mongoose.model('Registration',formschema)

  function validationError(reqbodyparameter){
      let data_which_we_have_to_pass_to_store=joi.object({
        firstname:joi.string().min(3).max(20).required(),
        lastname:joi.string().min(3).max(20).required(),
        userId:joi.number().required(),
        userlogin:{
            emailId:joi.string().required(),
            password:joi.string().required()
        },
        address:{
            city:joi.string().min(4).max(20).required(),
            state:joi.string().min(4).max(20).required(),
            pincode:joi.number().required()
        },
        mobileno:joi.number().required()
      })
      return joi.validate(reqbodyparameter,data_which_we_have_to_pass_to_store)
  }

  module.exports={formschema,formmodel,validationError}