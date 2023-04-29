import joi from "joi";

export const sendMessage = {
  params: joi.object().required().keys({
    receiverId: joi.string().min(24).max(24).required(),
  }),
  body : joi.object().required().keys({
    text : joi.string().min(2).max(5000).required()
  })
}