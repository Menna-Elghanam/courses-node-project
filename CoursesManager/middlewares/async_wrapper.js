module.exports=(async_fun)=>{
   return (req,res,next)=>{
      async_fun(req,res,next).catch((err)=>{
             next(err)
      })
   }
}