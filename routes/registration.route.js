const express=require('express') 
const bcrypt=require('bcryptjs')
let router=express.Router()
const ur=require('../mongodb/user-regi')

//Add new User
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

    let salt= await bcrypt.genSalt(10)
    data_will_store_in_database.userlogin.password=await bcrypt
                                                    .hash(data_will_store_in_database.userlogin.password,salt)

    let data=await data_will_store_in_database.save()
    res.send({message:'Ok',data_will_store_in_database:data})
    
})

//Fetch Data
router.get('/database',async(req,res)=>{
 let getdata=await ur.formmodel.find({})
 res.send(getdata)
})

//Update Data

//[Method One]
// router.put('/up/:id',async(req,res)=> {
//   let userid = await ur.formmodel.findByIdAndUpdate(req.params.id);
//   if(!userid){
//     res.status(402).send('Invalid Id');
//   }
//   userid.firstname=req.body.firstname;
//   userid.lastname=req.body.lastname;

//   let savedata=await userid.save();
//   res.send({message:'Data Updated Successfully',Updated_Data:savedata})

// })

//[Method Two]

router.put('/up/:id',async(req,res)=> {
  let userid = await ur.formmodel.findByIdAndUpdate(req.params.id,{$set:{
    firstname:req.body.firstname,
    lastname:req.body.lastname
  }},{new:true});
  if(!userid){
    res.status(402).send('Invalid Id');
  }

  res.send({message:'Data Updated Successfully',Updated_Data:userid})

})

//Pagination 
router.post('/:page',async(req,res)=>{
  let perpage=10
  let page=req.params.page || 1
  let data=await ur.formmodel.find({})
                             .skip((perpage*page)-perpage)
                             .limit(perpage)
  let totaluser=await ur.formmodel.find({}).count() 
  let totalpage=Math.ceil(totaluser/perpage) // O/P Without Ceil = 0.3
  res.send({
    perpage:perpage,
    page:page,
    userData:data,
    totalusercount:totaluser,
    totalpages:totalpage
  })                        
})

module.exports=router