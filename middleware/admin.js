let userr=require('../mongodb/userregi')
function admin(req,res,next){
    
    if(!req.userregi.isadmin){
        res.status(700).send('i dont know')
    }
    next();
}
module.exports=admin