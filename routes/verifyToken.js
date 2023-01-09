import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token  = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
            if(err) res.status(403).json("token is not valid!")
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json("you are not authenticated!")
    }
}

export const verifyTokenAndAuthentication = (res,req,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
             res.status(403).json("you are not allowed to do that!")
        }
    })
}

export const verifyTokenAndAdmin = (res,req,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
             res.status(403).json("you are not allowed to do that!")
        }
    })
}

// module.exports = {verifyToken, verifyTokenAndAuthentication, verifyTokenAndAdmin}