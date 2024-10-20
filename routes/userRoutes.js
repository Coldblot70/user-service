const express=require('express');
const router=express.Router();

const { loginUser,registerUser,getUserProfile } = require('../controller/usercontroller');
const protect = require('../middlewares/authMiddleware');


router.post('/login',loginUser);

router.post('/register',registerUser);

router.get('/profile', protect, getUserProfile);

module.exports=router;