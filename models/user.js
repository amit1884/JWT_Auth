const mongoose =require('mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        required:true
    },
    organisation:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Users",userSchema);