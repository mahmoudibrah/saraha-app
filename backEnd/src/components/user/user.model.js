import { Schema , model } from "mongoose"


const schema = new Schema({
    firstName : {
        type : String,
        required : true
    } , 
    lastName : {
        type : String,
        required : true
    },

    profilImage : {
        type: Object,
    },
    coverImage : String,

    password : {
        type : String,
        required : true
    } ,
    email : {
        type : String,
        required : true,
        unique : true
    },
    comfirmEmail : {
        type : Boolean,
        default : false,
    },
    online : {
        type : Boolean,
        default : false,
    } ,
    accountType : {
        type : String,
        default : "system",
        enum : ["system" , "google"]
    },
    code : {
        type : String,
        unique : true
    }
}, {
    timestamps : true
})


export const userModel = model("User" , schema)














