 const bcrypt=require('bcryptjs');
 const User=require('../Models/User');

 const mongoose=require('mongoose');
 const {generateToken}=require('../middleware/authenticate');



 // signup 

 async function signUp(req,res){
    try{
        const {username,email,password}=req.body;
        const existingUser=await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json('User already exist with this email');
        }
        // hash the password 
         
        const hashedpassword=await bcrypt.hash(password,12);

        // creating new using

        const newUser= await User.create(
            {
                username,
                email,
                password:hashedpassword
            }
        );
         

        // save the user to the database

        await newUser.save();
        
        // generate the token 
        const token=generateToken({useremail:newUser.email});

        // success msg send to the user 
        res.status(201).json({
            data:token
        });



    }catch(error){
        console.log('singup error',error.message);
        res.status(500).json({message:'sigup failed. Please try again'});

    }

 }
 async function logIn(req,res){
    try{
        const {username,password}=req.body;

        // check user by email
        const user=await User.findOne({username});

        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        // compare the passwords in the database

        const ispasswordValid=await bcrypt.compare(password,user.password);
        if(!ispasswordValid){
            return res.status(404).json({message:'Incorrect password'});
        }

        // generate the token

        const token= generateToken({userId:user._id,username:user.username});
        
        res.status(201).json({
            data:token
        });


    }catch(error){
        console.log('unable to login',error.message);
        res.status(500).json({message:'Unable to login Try again'});

    }

 }

 module.exports={
    signUp,
    logIn
 };