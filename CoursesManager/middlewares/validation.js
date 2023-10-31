const express=require('express')
const { body } = require('express-validator');
const {validationResult}=require('express-validator')



const validation_schema=()=>{
    return 
    [
        //validation using express-validator
    
        body('name')
        .notEmpty()
        .withMessage("Name is required ")
        .isLength({min:2})
        .withMessage("Name is atleast 2")
        ,
        body('price')
        .notEmpty()
        .withMessage("price is required ")
    
    ]
}
module.exports=validation_schema;