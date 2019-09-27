

// function admin(req,res,next){
    
//     if(!req.userregi.isadmin){
//         res.status(700).send('i dont know')
//     }
//     next();
// }

function admin(request, response, next) {
    if (!request.userregi.isadmin) {
        response.send({message: 'Permission denied.' });
    }
    else {
        next();
    }
};

module.exports=admin