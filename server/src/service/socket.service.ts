import {io} from '../index'
import {Socket} from 'socket.io'


const initSocketService=()=>{

    io.on('connection',(socket:Socket)=>{
        console.log(`${socket.id} connected`)

        socket.on('msg',(msg)=>{
            console.log('message incoming')
            console.log(msg[msg.length-1])

            socket.emit('recieve-msg',{
                role:'bot',
                content:'hii',
            })
        })
        

        socket.on('disconnect',()=>{
            console.log('socket disconnected')
        })
    })
}

export default initSocketService
