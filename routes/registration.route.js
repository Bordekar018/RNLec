const express=require('express') 
const bcrypt=require('bcryptjs')
let router=express.Router()
const ur=require('../mongodb/user-regi')

router.post('/regis',async(req,res)=>{
  let {error}=ur.validationError(req.body);
  if(error){
    return res.status(402).send(error.details[0].message)
  }
  let user=await ur.formmodel.findOne({"userlogin.emailId":req.body.userlogin.emailId})
  if(user){
    return res.status(402).send("already")
  }
    let data_will_store_in_database= new ur.formmodel({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      userId:req.body.userId,
    //   userlogin:{
    //       emailId:req.body.emailId,
    //       password:req.body.password
    //   },
      userlogin:req.body.userlogin,
    //   address:{
    //       city:req.body.city,
    //       state:req.body.state,
    //       pincode:req.body.pincode
    //   },
      address:req.body.address,
      mobileno:req.body.mobileno    
    })

    let salt= await bcrypt.genSaltSync(10)
    data_will_store_in_database.userlogin.password=await bcrypt
                                                    .hashSync(data_will_store_in_database.userlogin.password,salt)

    let data=await data_will_store_in_database.save()
    res.send({message:'Ok',data_will_store_in_database:data})
    
})


router.get('/database',async(req,res)=>{
 let getdata=await ur.formmodel.find({})
 res.send(getdata)
})

module.exports=router