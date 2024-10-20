const userModel=require('../models/user.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');

const loginUser=async (req,res,next)=>{
   const {email,password}=req.body;
   
   console.log(email,password,'log');
   const user=await userModel.findOne({'email':email});
   
  
   if(!user)
    return res.status(400).json({'message':'user not found!'});
   try{
   const isMatch=await bcrypt.compare(password,user.password);
    
   if(!isMatch)
   {
    return res.status(401).json({'message':'email or password is incorrect'});
   }
   
   const token=generateToken(user._id);

   res.status(201).json({
    '_id':user._id,
    'name':user.name,
    'password':user.password,
    'token':token
   })}
   catch(err)
   {
    next(err);
   }
}

const registerUser=async (req,res,next)=>{
   const {name,email,password}=req.body;
   console.log(name,email,password);
   if (!password) {
    return res.status(400).json({ error: 'Password is required' });
   }


   try
   {   const exist=await userModel.findOne({'email':email});
   
   if(exist)
   {
    return res.status(401).json({'message':'email or password is incorrect'});
   }

   const newUser =  await userModel.create({ name, email, password });
   const token=generateToken(newUser._id);

    return res.status(201).json({ _id: newUser._id,'name':newUser.name,'email':newUser.email,'token':token});
   }
   catch(err)
   {
    next(err);
   }
}

const getUserProfile=async (req,res,next)=>{
    const user=await userModel.findOne({'_id':req.user._id});
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });

}  




module.exports={loginUser,registerUser,getUserProfile};