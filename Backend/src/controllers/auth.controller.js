const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

require('dotenv').config();

const registerUser = async (req,res) =>{
    try{
        const {username, email, password} = req.body;

        //user mail already exist
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User mail already exists.' });
        }
        
        //hash the raw password
        const hash = await bcrypt.hash(password, saltRounds);
        //create user
        await User.create({ username, email, password: hash });
        res.status(201).json({ msg: 'Signup Sucessfull' });

    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg:"Something went wrong !!!"})
    }
};

const loginUser = async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            //email exist nahi krta 
            res.status(404).json({msg:"User Not Found, Plzz signup"})
        }
        else{
            let hash = user.password;

            const result = await bcrypt.compare(password, hash);
            if(result == true){
                var token = jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY,{ expiresIn: '1d' });
                res.status(200).json({msg:'Login sucessful', token});

            }
            else{
                res.status(401).json({msg:"Wrong Password"})
            }
        
        }
    }
    catch(err){
        res.status(500).json({msg:"Something went wrong"})
    }
}

module.exports = {registerUser, loginUser};