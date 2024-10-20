const express=require('express');
const env = require('dotenv');
const userRouter=require('./routes/userRoutes.js');
const connect=require('./config/database.js')

env.config({ path: './config.env' });

const app=express();

connect();
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.use(express.json())
app.use(express.urlencoded());

app.use('/api/users',userRouter);

app.listen(process.env.PORT || 3000,()=>{console.log(`Server started on port: ${process.env.PORT}`)});