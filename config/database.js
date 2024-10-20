const mongoose=require('mongoose');
const env=require('dotenv').config({path:'./env'});

const connect=async ()=>{
    try{
       const host=await mongoose.connect(process.env.MONGO_URI,{dbName:'User-Service'});
       console.log('connected',host.connection.host);
    }
    catch(exp)
    {
       console.error('Database not connected!',exp);
    }
}

module.exports=connect;