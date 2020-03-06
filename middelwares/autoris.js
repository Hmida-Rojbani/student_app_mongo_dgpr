/// check if user isAdmin
module.exports= function(req,res,next){
    //401 unathorized
    //403 Forbiden

    if(!req.user.isAdmin) return res.status(403).send('Access Denied.');
    next();
}