
import { Router  } from "express";
import { confirmEmail, requestToken, sendCode, signup , forgetPassword  , signin} from './signup.signin.js';
import { ShareProfile, deletedImage, deletedUser, profile, updatePassword, uploadImage } from './user.service.js';
import { auth } from './../../middleware/auth.js';
import { validation } from "../../middleware/validation.js";
import * as validator from "./user.validation.js"


const router = Router()


router.post('/signup' , validation(validator.signup) ,  signup)

router.get("/confirmEmail/:token" , confirmEmail)
router.get("/requestToken/:refreshToken" , requestToken)

router.post("/sendCode" ,  validation(validator.sendCode) , sendCode)
router.post("/forgetPassword" , validation(validator.forgetPassword)  ,forgetPassword)

router.post("/signin" , validation(validator.signin) , signin)

router.get("/profile" , auth , profile )
router.patch("/updatePassword" , auth , validation(validator.updatePassword) ,  updatePassword)
router.delete("/" , auth , deletedUser)
router.get("/ShareProfile/:_id" , ShareProfile)
router.put("/uploadImage"  , auth , uploadImage)
router.delete("/deletedImage"  , auth  , deletedImage)











export default router



