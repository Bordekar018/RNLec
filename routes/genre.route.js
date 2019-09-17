let express=require('express')
let router=express.Router()
let g=require('../mongodb/genre')

router.post('/genre',async(req,res)=>{
    let {error}=g.ValidationError(req.body)
    if(error){
        return res.status(402).send(error.details[0].message)
    }
    let data=new g.genremodel({
        name:req.body.name
    })
    let items=await data.save()
    res.send(items)
})

module.exports=router;