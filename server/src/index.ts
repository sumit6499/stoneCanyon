import express,{Request,Response} from 'express'
import {createServer} from 'node:http'
import router from './routes/category.route'
import cors from 'cors'
import {Server, Socket} from 'socket.io'
import initSocketService from './service/socket.service'

const app=express()
const PORT=process.env.PORT || 3000
const HOST='localhost'
const server=createServer(app)

export const io=new Server(server,{
    cors:{
        origin:"*",
        credentials:true,
    }
})

initSocketService()

app.use(cors({
    origin:"*",
    credentials:true,
}))
app.use(express.urlencoded({extended:true,limit:"30mb"}))
app.use(express.json({limit:'30mb'}))

//routes
app.use('/api',router)

app.get('/',(req:Request,res:Response)=>{
    res.json({
        success:true,
        msg:"Hello from chatbot server"
    })
})

server.listen(PORT,()=>{
    console.log(`server running on ${HOST}:${PORT}`)
})