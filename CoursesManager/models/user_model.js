// validator:
const validator=require('validator')
// mongoose
const mongoose=require('mongoose')
//outsourced:
const user_roles=require('../utils/user_roles')
// schema:
const user_schema= new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    }
    ,
    last_name:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true,
        unique:true,
        validator:[validator.isEmail,'this field is required']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:[user_roles.MANAGER,user_roles.ADMIN,user_roles.USER],
        default:user_roles.USER

    }

})
//model
module.exports=mongoose.model("user",user_schema)