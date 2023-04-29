
import  asyncHandler  from 'express-async-handler';
import jwt from "jsonwebtoken"

export const auth = asyncHandler((req , res , next)=> {
    const token = req.header("auth-token")
    if(!token) return res.status(401).json({message : "Not authentication"})
    const secretKey = process.env.secretKey
    const user = jwt.verify(token , secretKey)
    req.user = user
    next()
})
