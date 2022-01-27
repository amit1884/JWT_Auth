const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../models/user');
router.post('/api/v1/register',(req,res)=>{

    const{fullname,email,password,contact,organisation,designation}=req.body;

    if(!fullname||!email||!password||!contact||!organisation||!designation)
    {
       return res.status(422).json({
            error:"Please fill al the fields"
        })
    }

    User.findOne({email:email})
    .then(savedUser=>{
        
        if(savedUser){
            return res.json({message:"Already Exist"});
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{

            const user=new User({
                email,
                password:hashedpassword,
                fullname,
                contact,
                organisation,
                designation
            })
            user.save()
            .then(user=>{
                res.json({message:"Successfully saved"})
            })
            .catch(err=>{
                console.log(err)
                res.json({message:"Some Error occurred"})
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post("/api/v1/login",(req,res)=>{

    const{email,password}=req.body;
    if(!email||!password){
        return res.status(422).json({error:"Please fill all the  fields are required"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
          return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
              const token =jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
              const {_id,email,fullname,contact,organisation,designation}=savedUser
              res.json({token,user:{_id,email,fullname,contact,organisation,designation}})
            }
            else{
              return res.status(422).json({error:"Invalid password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports=router;