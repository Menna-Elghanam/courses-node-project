const {validationResult}=require('express-validator')

// import outsoursed modules
let courses=require('../data/courses.js')


// get all courses
const get_courses=(req,res)=>{
    res.json(courses)
    }
    


// get single gourse
const get_single_course=(req,res)=>{
   
    const course_id=+req.params.course_id;
    const course=courses.find((course)=>course.id===course_id)
    if(!course){
        return res.status(404).json({message:"Course Not Found"})

    }
    res.json(course)
}
// add new course
const add_course=(req,res)=>{
    const errors=validationResult(req)
    // console.log(errors);
    if(!errors.isEmpty()){
        return res.status(404).json(errors.array())
    }

// console.log(req.body);

const course={id:courses.length+1 ,...req.body}
courses.push(course)

res.status(201).json(course)
}
// update course
const update_course=(req,res)=>{
    const course_id=+req.params.course_id;
    let course=courses.find((course)=>course.id===course_id)
    if(!course){
        return res.status(404).json({message:"Corse not found"})
    }
    course={...course,...req.body}
res.status(200).json(course)
}
module.exports={
    get_courses,
    get_single_course,
    add_course,
    update_course
}