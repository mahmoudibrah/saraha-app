import {Schema , model , Types} from "mongoose"


const schema = new Schema({
    text : {
        type : String,
        required : true
    },
    receiverId :  {
        type : Types.ObjectId,
        ref : "User"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
{timestamps : true})

export const messageModel = model("Message" , schema)