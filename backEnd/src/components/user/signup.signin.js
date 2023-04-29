import asyncHandler from "express-async-handler";
import { userModel } from './user.model.js';
import bcrypt from "bcrypt"
import { getAuthToken } from '../../utils/getAuthToken.js';
import { sendEmail } from "../../utils/sendEmail.js";
import  jwt  from 'jsonwebtoken';
import { nanoid } from 'nanoid';

// SignUP

export const signup = asyncHandler(async (req, res, next) => {
    const {firstName , lastName , email , password  } = req.body
    const user = await userModel.findOne({email}) // {} , null
    if(user) return res.status(400).json({message : "email already Exist...."})
    
    const salt = await bcrypt.genSalt(parseInt(process.env.salt))
    const passwordHash = await bcrypt.hash(password , salt)

    const newUser = new userModel({
        firstName,
        lastName,
        email,
        password : passwordHash
    })
    const saveUser = await newUser.save()

    const {accessToken , refreshToken} = getAuthToken(saveUser)

    // const message  = `<a href='${req.protocol}://${req.headers.host}${process.env.baseURL}/users/confirmEmail/${accessToken}'>Follow me to confirm email token</a> 
    // <br>
    // <a href='${req.protocol}://${req.headers.host}${process.env.baseURL}/users/requestToken/${refreshToken}'>
    // Request New Link
    //  </a>
    // `
    //http://localhost:3000
    const message  = `<a href='${process.env.clientUrl}/verify/${accessToken}'>Follow me to confirm email token</a> 
    `
    // const message = `${process.env.clientUrl}users/${saveUser._id}/comfirmEmail/${accessToken}`
    sendEmail({ email : saveUser.email , bodyEmail : message  })

 

    return res.status(201).json({message : "An Email sent to your account please verify" , accessToken})
}); 


//// confirmEmail
export const confirmEmail = asyncHandler(async (req, res, next) => {

    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.secretKey);

    const user = await userModel.findById(decoded._id);

    if (!user) return res.status(401).json({ message: "Invalid token" });
    user.comfirmEmail = true;
    await user.save();
    return  res.status(200).json({ message: "Email verified successfully" , user });
});

// refresh Token 
export const requestToken = asyncHandler(async(req , res , next)=> {
    const {refreshToken}  = req.params
    console.log(refreshToken);
    const decoded = jwt.verify(refreshToken , process.env.secretKey)
    console.log(decoded._id);
    if(!decoded?._id) return res.status(400).json({message: "In-valid Token"})
    const user = await userModel.findById(decoded._id)
    if(user?.comfirmEmail) return res.status(400).json({message : "user already confirmed"})
    const {verifyEmail} = getAuthToken(decoded)
    const message = `<a href='${req.protocol}://${req.headers.host}${process.env.baseURL}/users/confirmEmail/${verifyEmail}'>Follow me to confirm email token</a>`
    sendEmail({email :  user.email    , bodyEmail : message})
    console.log(user);
    return res.status(200).json({message : "Done"})
})



export const sendCode = asyncHandler(async (req , res , next) => {
    const {email} = req.body
    const user = await  userModel.findOne({email})  // {} , null
    if(!user) return res.status(400).json({message : "can't send code to not resgister account or deleted"})
      // const code = Math.floor(Math.random() * 9000 + 1000)
    const code = nanoid()
    await userModel.updateOne({_id : user._id} , {code})
    const message = `<h1> Please user this code  : <a>${code}</a> to reset password </h1>`
    sendEmail({email :  user.email    , bodyEmail : message})
    return   res.status(200).json({message : "Done"})
})


export const forgetPassword = asyncHandler( async(req ,res , next) => {
    const {email , code , newPassword} = req.body;
    console.log(email , code , newPassword);
    const user = await userModel.findOne({email})
    if(!user) return res.status(400).json({message: "Not resgister Account"})
    if(user.code !== code || code == null) return res.status(400).json({message : "In-valid code "})
    const hashpassword = await bcrypt.hash(newPassword , parseInt(process.env.salt)) 
    await userModel.updateOne({_id : user._id} , {password :  hashpassword , code : null , comfirmEmail : true})
    return res.json({message : "Done"})
 })  




 

 ////////////////////////////////////  signin ///////////////////////////////////////////

 export const signin = asyncHandler(async (req, res, next) => {
    const { email , password  } = req.body
    const user = await userModel.findOne({email}) // {} , null
    if(!user) return res.status(400).json({message: "Invalid email or password...."});
  if (!user?.comfirmEmail) return res.status(400).json({message: "Please comfir your email first"});
    const match = await bcrypt.compare(password , user.password)
    if (!match) return res.status(400).json({message: "Invalid email or password...."});
    await userModel.updateOne({_id : user._id} , {online : true})
    const { accessToken } = getAuthToken(user)
    return  res.status(200).json({message : "Done" , accessToken})
}); 








