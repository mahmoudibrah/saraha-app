import joi from "joi"


/*
At least one upper case English letter, (?=.*?[A-Z])
At least one lower case English letter, (?=.*?[a-z])
At least one digit, (?=.*?[0-9])
Minimum eight in length .{8,} (with the anchors)
At least one special character, (?=.*?[#?!@$%^&*-])
*/


export const signup = {
    body: joi.object().required().keys({
        firstName : joi.string().min(2).max(10).required().messages({
            "any.required" : "please send firstName",
            "string.empty" : "not allowed to be empty" 
        }),
        lastName :joi.string().min(2).max(10).required().messages({
            "any.required" : "please send lastName",
            "string.empty" : "not allowed to be empty" 
        }),
        email : joi.string().email().required().messages({
            "any.required" : "please send email",
            "string.empty" : "not allowed to be empty",
            "string.email"  : " must be a valid email" 
        }),
        password : joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)).required().messages({
            "any.required" : "please send password",
            "string.empty" : "not allowed to be empty",
            "string.pattern.base": "At least one upper case English letter, At least one lower case English letter, At least one digit, Minimum eight in length 6"
        }),
    })
}

export const signin = {
    body: joi.object().required().keys({
        email : joi.string().email().required().messages({
            "any.required" : "please send email",
            "string.empty" : "not allowed to be empty" 
        }),
        password : joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)).required().messages({
            "any.required" : "please send password",
            "string.empty" : "not allowed to be empty",
            "string.pattern.base": "At least one upper case English letter, At least one lower case English letter, At least one digit, Minimum eight in length 6"
        }),
    })
}

 
export  const sendCode = {
    body: joi.object().required().keys({
        email : joi.string().email().required().messages({
            "any.required" : "please send email",
            "string.empty" : "not allowed to be empty" 
        }),
    })
}

export const forgetPassword = {
    body: joi.object().required().keys({
        email : joi.string().email().required().messages({
            "any.required" : "please send email",
            "string.empty" : "not allowed to be empty" 
        }),
        code : joi.string().required(),
        newPassword : joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)).required().messages({
            "any.required" : "please send password",
            "string.empty" : "not allowed to be empty",
            "string.pattern.base": "At least one upper case English letter, At least one lower case English letter, At least one digit, Minimum eight in length 6"
        }),
    })
}


export const updatePassword =  {
    body: joi.object().required().keys({
        oldPassword  : joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)).required().messages({
            "any.required" : "please send password",
            "string.empty" : "not allowed to be empty",
            "string.pattern.base": "At least one upper case English letter, At least one lower case English letter, At least one digit, Minimum eight in length 6"
        }), 
        newPassword :  joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)).required().messages({
            "any.required" : "please send password",
            "string.empty" : "not allowed to be empty",
            "string.pattern.base": "At least one upper case English letter, At least one lower case English letter, At least one digit, Minimum eight in length 6"
        }),
        cpassword : joi.string().valid(joi.ref("newPassword")).required().messages({
            "any.only" :"The password must match"
        })
    })
}





