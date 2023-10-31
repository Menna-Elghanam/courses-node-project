const {validationResult}= require('express-validator')
// import outsoursed modules
const  Course=require('../models/course_models')
const http_status_text=require('../utils/http_status_text')
const async_wrapper=require('../middlewares/async_wrapper')
const app_error=require('../utils/app_error')
// get all courses
const get_courses=async(req,res)=>{
    //pagenation
    const query=req.query;
    const limit=query.limit||10;
    const page=query.page||1;
    const skip=(page-1)*limit;
    
 const courses= await Course.find({},{"__v":false}).limit(limit).skip(skip);
//.limit(limit).skip(1)
 res.json({status:http_status_text.SUCSSESS,data:{courses}} )
}


// get single gourse
const get_single_course=async_wrapper(
  async(req,res,next)=>{
  
   const course=await Course.findById(req.params.course_id)
   if(!course){
    const error=app_error.create("not found!!!",404,http_status_text.FAIL)
     return  next(error)
      //  return res.status(404).json({status:http_status_text.FAIL,data:{course:"course not found"}})

   }  
    return res.json({status:http_status_text.SUCSSESS,data:{course}})

  //   try{
  // }
  // catch(err){
  //  return res.status(400).json({status:http_status_text.ERROR,data:null,message:err.message,code:400})
  //   // handle invalid ID
  // }
 
})
// add new course
const add_course= async_wrapper(async(req,res)=>{
  const errors=validationResult(req)
  // console.log(errors);
  if(!errors.isEmpty()){
      return res.status(404).json({status:http_status_text.FAIL,data:errors.array()})
  }

// console.log(req.body);

const new_course=new Course(req.body)
await new_course.save()

res.status(201).json({status:http_status_text.SUCSSESS,data:{course:new_course}})
}) 
// update course:

const update_course = async (req, res) => {
    const course_id = req.params.course_id;
    try {
      const updated_course = await Course.findByIdAndUpdate(
        {_id:course_id} ,
        { $set: req.body },
        
      );

      if (!updated_course) {
        return res.status(404).json({status:http_status_text.ERROR,data:null,message:"course not found"});
      }else{
        return res
        .status(200)
        .json({ status:http_status_text.SUCSSESS, data: { course: updated_course } });
      }
     
    } catch (err) {
      return res.status(500).json({status:http_status_text.ERROR,data:null,message:err.message});
    }
  };

//delete course

const delete_course=async(req,res)=>{
      const data=await Course.deleteOne({_id:req.params.course_id})
   res.status(200).json({ status :http_status_text.SUCSSESS, data : null})
}
module.exports={
    get_courses,
    get_single_course,
    add_course,
    update_course,
    delete_course
}