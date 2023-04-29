




import asyncHandler  from 'express-async-handler';
import { userModel } from './user.model.js';
import  bcrypt  from 'bcrypt';
import cloudinary from '../../utils/cloudinary.js'

// profile
export const profile = asyncHandler( async(req , res, next)=> {
    const user = await userModel.findById({_id:req.user._id})
    return res.status(200).json({message: "Done" , user })
})  


// updatePassword
export const updatePassword = asyncHandler( async (req , res, next)=> {
    const {oldPassword , newPassword} = req.body
    const user = await userModel.findById(req.user._id)
    const match = await bcrypt.compare(oldPassword , user.password)
    if(!match) return res.status(401).json({message: "In-valid login password" })
    const hashpassword = await bcrypt.hash(newPassword,parseInt(process.env.salt))
    await userModel.updateOne({_id : user._id} , {password : hashpassword})
    return res.status(200).json({message: "Done"  })
}) 

// deletedUser
export const deletedUser = asyncHandler( async (req , res, next)=> {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.user._id)
        return  res.status(200).json({message: "Done"  ,  deletedUser})
      } catch (error) {
        return res.status(500).json({message: "error" , error  })
      }
}) 



export const uploadImage =  asyncHandler( async (req , res, next)=> { 
    const {uploadImage , oldImge} = req.body
    if(uploadImage) {
        if(uploadImage && oldImge) {
            await cloudinary.uploader.destroy(oldImge.public_id , {upload_preset: "sarahaApp"})
        }
       const uploadImageRespone =  await cloudinary.uploader.upload(uploadImage , {upload_preset: "sarahaApp"})
       if(uploadImageRespone) {
        const updateImageUser = await userModel.findByIdAndUpdate(req.user._id,  {profilImage: uploadImageRespone } , {new:true} )
        return  res.status(200).json({updateImageUser}) 
       }
    }
}) 




export const deletedImage = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    if (user.profilImage) {
      const destroyResponse = await cloudinary.uploader.destroy(user.profilImage.public_id, { upload_preset: "sarahaApp" });
      if (destroyResponse) {
        await userModel.updateOne({ _id: req.user._id }, { $unset: { profilImage: 1 } }); // delete profilImage field
        return res.status(200).json({ message: "Profil image deleted successfully" });
      }
    } else {
      return res.status(200).json({ message: "Failed to delete profil image" });
    }
  });




// ShareProfile
export const ShareProfile =  asyncHandler( async (req , res, next)=> {
    const {_id} = req.params
    const user = await userModel.findById(_id).select("firstName , lastName , profilImage")
    if(!user) return res.status(400).json({message : "User not found"})
    return res.status(200).json({message : "Done"  , user})
}) 















