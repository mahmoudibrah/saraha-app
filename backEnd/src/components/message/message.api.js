
import { Router } from "express";
import { allMessages, sendMessage } from "./message.service.js";
import { auth } from './../../middleware/auth.js';
import * as validator from "./message.validation.js"
import { validation } from './../../middleware/validation.js';
const router = Router()

router.post("/:receiverId", validation(validator.sendMessage) ,sendMessage )
router.get("/" , auth , allMessages)











export default router
