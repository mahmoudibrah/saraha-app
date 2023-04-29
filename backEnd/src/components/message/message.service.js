

import asyncHandler from "express-async-handler";
import { userModel } from './../user/user.model.js';
import { messageModel } from './message.model.js';


export const sendMessage = asyncHandler(async(req , res , next)=> {
    const {text} = req.body;
    const { receiverId } = req.params;
    const user = await userModel.findById(receiverId).select("email lastName firstName")
    if(!user) return res.status(400).json({ messsage: "In-valid receiver"})
    const newMessage = new messageModel({text , receiverId})
    const sevedMessage = await newMessage.save()
    res.status(200).json({ messsage: "Done" , sevedMessage : sevedMessage });
})



export const allMessages = async(req , res) => {
    const messages = await messageModel.find({receiverId : req.user._id , isDeleted: false})
    if(!messages) return res.status(200).json({ messsage: "There are no messages"});
    return  res.status(200).json({ messsage: "Done" , messages });;
}











