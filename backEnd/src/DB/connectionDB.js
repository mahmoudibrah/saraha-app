
import mongoose from "mongoose"

const connectionDB = async() => {
    return await mongoose.connect(process.env.connectionDB).then((result)=> {
        console.log(`connectio dataBase........... ${process.env.connectionDB}`);
    }).catch((error)=> {
        console.log(`fail connection dataBase` , error);
    }) 
}

export default connectionDB






