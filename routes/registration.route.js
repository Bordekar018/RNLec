const express=require('express') 
let router=express.Router()
const ur=require('../mongodb/user-regi')

router.post('/regis',async(req,res)=>{
 
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
    let data=await data_will_store_in_database.save()
    res.send({message:'Ok',data_will_store_in_database:data})
    
})

router.get('/database',async(req,res)=>{
 let getdata=await ur.formmodel.find({})
 res.send(getdata)
})

module.exports=router