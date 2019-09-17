  const mongoose=require('mongoose')
 mongoose
  .connect("mongodb://localhost/DR",{
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(()=>{
      console.log("Connection is Successful...Intializing...");   
  })
  .catch((err)=>{
   console.log("Error.....Terminating",err);
   });
  
   let authorschema=new mongoose.Schema({
    name:{type:String,required:true,min:4,max:20},
    website:{type:String,required:true},
    email:{type:String,}
   })

   let courseschema=new mongoose.Schema({
    name:{type:String},
    authorId:{type:mongoose.Schema.Types.ObjectId,ref:"relation"}
   })

   let authormodel=mongoose.model('relation',authorschema)
   let coursemodel=mongoose.model('relcourse',courseschema)

   async function author(){
   let authordata= new authormodel({
       name:"ANI",
       website:"WWW.G_a_V.com",
       email:"Ani018@gmail.com"
   })
   
   let authorsave= await authordata.save()
   console.log(authorsave);
   }

    async function course(authorId){
    let coursedata=new coursemodel({
        name:"React-Node",
        authorId:authorId
   })

    let coursesave= await coursedata.save()
    console.log(coursesave);
   }

   async function getalldata(){
       let data=await coursemodel.find().populate('authorId','name website')
       console.log(data);
       
   }
   getalldata()
 // author();
  //course("5d80f49a06bf7a2c346feb27")