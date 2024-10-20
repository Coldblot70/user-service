const userModel=require('../models/user.js');
const jwt = require('jsonwebtoken');


const protect=async (req,res,next)=>{
   if(req.headers.authorization && req.headers.startsWith('Bearer'))
   {
    try{
        let token=req.headers.authorization.split(' ')[1];

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
    
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user data
    
        next();
    }
    catch(err)
    {
        res.status(401).json({'message':'not authroized!token failed!'});
    }
   }
   else{
    res.status(401).json({ message: 'Not authorized, no token' }); // Unauthorized response
   }
}

module.exports=protect;