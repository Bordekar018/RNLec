const mongoose=require('mongoose')
let joi=require('joi')

  let genreschema=new mongoose.Schema({
      name:{type:String,required:true,min:4,max:20}

  })
  let genremodel = mongoose.model('moviegenre',genreschema)

   function ValidationError(error) {
       let Schema =joi.object().keys({
           name:joi.string().min(4).max(20).required()
       })
       return joi.validate(error,Schema)
   }

// async function genre(){
// let genredata=new genremodel({
// name:"Comedy"
// })

// let genresave=await genredata.save()
// console.log(genresave);
// }
// genre();

module.exports={genreschema,genremodel,ValidationError}