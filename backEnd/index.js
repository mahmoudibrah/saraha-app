import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import  userRouts from "./src/components/user/user.api.js"
import messageRouter from "./src/components/message/message.api.js"
import connectionDB from "./src/DB/connectionDB.js"
import bodyParser from "body-parser"
const app = express()
const port = process.env.port
const baseURL = process.env.baseURL

app.use(cors())
app.use(express.json({ limit: '10mb' }))
// app.use(express.json())

app.use(bodyParser.json({ limit: '10mb' }))




app.use(`${baseURL}/users` , userRouts)
app.use(`${baseURL}/messages` , messageRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.use("*" , (req , res)=> {
    res.status(400).json({message : "In-vaild router or method"})
})
app.listen(port, () => console.log(`server is running on port....................${port}!`))
connectionDB()