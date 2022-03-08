const checkheader= function(req,res,next){

  let data = req.headers.isfreeappuser

   if(!data){
     return res.send("Request is missing a mandatory header")
   }else{
       next()
   }
}
module.exports.checkheader = checkheader



