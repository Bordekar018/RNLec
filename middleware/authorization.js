const jwt =require('jsonwebtoken')
const config=require('config')
function UserAuth(req,res,next){
let token =req.header('x-auth-token');
if(!token){
    return res.status(400).send({message:'token not found'})
        }
    try{
    let decoded=jwt.verify(token,config.get('jwtprivatekey'));
    req.userregi=decoded;
    next();
          }

    catch(ex){
        res.status(401).send({message:'Unauthorized User'})
    }
}
module.exports=UserAuth