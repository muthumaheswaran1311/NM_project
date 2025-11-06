import jwt from "jsonwebtoken"

const middleware = async(req,res,next) => {
    try {
        const {token} = req.headers;
        if(!token){
            res.json({success:false,message:"No token"})
        }
        const token_decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = token_decoded.id
        next();
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Unauthorized"})
    }
    
}

export default middleware;