let express=require('express')
let router=express.Router()
let F=require('../mongodb/userregi')
let multer=require('multer')

let imgport='http://localhost:4000';

let storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./uploads/');
    },
    filename:function (req,file,cb) {
        cb(null,Date.now() + file.originalname);
    }
})

const filetype=(req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg')
    {
        cb(null,true)
    }
    else
    {
         cb(null,false)
    }
}

let upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*20
    },
    filetype:filetype
})

router.post('/file', upload.single('image'),async(req,res)=>{
let callfilemodeltostore=new F.filemodel({
    image:imgport + '/uploads/' + req.file.filename
})
if(!callfilemodeltostore){
    return res.status(402).send('File not found')
}
let datashowinoutput=await callfilemodeltostore.save();

res.send({
    message:'FileUploaded',
    Data:datashowinoutput
})
})

router.get('/:id',async(req,res)=>{
    let file=await F.filemodel.findById(req.params.id)
    if(!file){
        return res.status(403).send('File not found')
    }
    res.send(file)
})
module.exports=router