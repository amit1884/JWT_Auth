const express=require('express')
const User=require('../models/user');
const router=express.Router();

router.get('/api/v1/user/:id',(req,res)=>{

  const user_id=req.params.id

  User.findById(user_id)
  .then(userfound=>{
    if(!userfound)
    res.send({
      message:'No user found',
      status:0
    })
    else {

      const {fullname,contact,email,organisation,designation}=userfound
      let user={
        fullname,
        contact,
        email,
        organisation,
        designation
      }
      res.send({
        data:user,
        status:1
      })
    }
  })
  .catch(err=>{
    console.log(err)
  })
})


module.exports=router