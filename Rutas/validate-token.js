const jwt=require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    const token=req.header("auth-token")
    if(!token){
        return res.status(401).json({
            error:"acceso no autorizado"
        })
        try {
            const verified=jwt.verify(token,"claveSecreta")
            req.user=verified
            next()
        }catch(error){
            res.status(400).json({
                error:"el token no es valido"
            })
        }
    }

}
module.exports=verifyToken;
