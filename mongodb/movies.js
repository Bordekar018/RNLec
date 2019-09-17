const mongoose=require('mongoose')
let joi=require('joi')
let gschema=require('./genre')

let moviesschema=new mongoose.Schema({
    name:{type:String,required:true,min:5,max:20},
    genre:{
        type:gschema.genreschema,required:true
    },
    rating:{type:Number,required:true},
    price:{type:Number}
  })

let moviemodel=mongoose.model('movies',moviesschema)
function ValidationError(error) {
    let Schema =joi.object().keys({
        name:joi.string().min(4).max(20).required(),
        genreId:joi.string().required(),
        rating:joi.number().required(),
        price:joi.number().required(),
    })
    return joi.validate(error,Schema)
}


module.exports={moviesschema,moviemodel,ValidationError}