var jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req,res,next)=>{
    let token = req.headers?.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({msg:"Unauthorised or No Token"});
    }

    try{
        const decoded  = jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        req.user = decoded.userId;
        next();
        
    }
    catch(err){
        res.status(401).json({msg:"Unauthorised !!  "})
    }
}

module.exports = authMiddleware;