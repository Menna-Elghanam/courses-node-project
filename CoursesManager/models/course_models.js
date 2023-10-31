// mongoose
const mongoose=require('mongoose')
// schema:
const course_schema= new mongoose.Schema({
    name:String,
    price:Number
})
//model
module.exports=mongoose.model("Course",course_schema)