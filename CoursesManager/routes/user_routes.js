const express=require('express')
const router=express.Router()

// import outsoursed modules
const user_controller=require('../controllers/users_controller')
const verfiy_token=require('../middlewares/verfiy_token')

// get all users

router.get('/api/users',verfiy_token,user_controller.get_all_users)
//register

router.post('/api/users/register', user_controller.register)
//login

router.post('/api/users/login',user_controller.login)





module.exports=router
