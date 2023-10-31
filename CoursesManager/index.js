// import to packages
const express=require('express')
// server set_up
const app=express()
app.listen(5002)
//express-validator

//body parser
app.use(express.json())

const course_router=require('./routes/courses_routes')
app.use('/api/courses',course_router)