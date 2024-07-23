// checking while the user is signing up that is the account already made or not 
const express = require('express');
const router = express.Router();
const {signUp,logIn} = require('../Controllers/AuthControllers'); 

// for handling the singup operation 
router.post('/signup',signUp);
// for handling the login operation 
router.post('/login',logIn);


module.exports= router;