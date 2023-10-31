// import to packages
const express=require('express')
require('dotenv').config()
// server set_up
const app=express()
app.listen(process.env.PORT)
//out_sourecd modules
const http_status_text=require('./utils/http_status_text')
const app_error=require('./utils/app_error')


//body parser
app.use(express.json())
//course_router
const course_router=require('./routes/courses_routes')
app.use('/',course_router)
//user_router
const user_router=require('./routes/user_routes')
app.use('/',user_router)


//  global middleware for not found req:
app.all('*',(req,res,next)=>{
    return res.status(400).json({status:http_status_text.ERROR,message:"Page mot found"})
})

//global middleware for erroe handler 
app.use((error,req,res,next)=>{
    res.status(app_error.status_code||500).json({status:app_error.status_message||http_status_text.ERROR,message:error.message,code:app_error.status_code||500,data:"null"})
})
// console.log("process",process.env.MONGO_URL);

// conect our app to DB using mongoose:
const mongoose=require('mongoose')
const url=process.env.MONGO_URL
mongoose.connect(url).then(()=>{
    console.log("created");
})
