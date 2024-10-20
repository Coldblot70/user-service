const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');

const schema=mongoose.Schema({
'name':{
    type:String,
    required:true
},
'email':{
    type:String,
    required:true,
    unique:true
},
'password':{
    type:String,
    required:true
},
'date':{
    type:Date,
    default:Date.now
},
});

schema.pre('validate',async function (next) {
    const regex=/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    console.log('Password being validated:', this.password,regex.test(this.password)); // Log the password
    console.log('Is password modified:', this.isModified('password')); 
    if(!regex.test(this.password))
    {
      return next(new Error('Password must contain at least one uppercase letter, one special character, and be at least 8 characters long.'));
    }
    next();
 });

schema.pre('save',async function (next){
   if(!this.isModified('password'))
   {
    return next();
   }
   else
   {
     try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
     }
     catch(exp)
     {
       next(exp);
     }
   }
});



const userModel=mongoose.model('UserModel',schema);

module.exports=userModel;