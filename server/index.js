import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
// import { user } from "../c-chat/src/Components/join/Join";
const PORT = 5000 || process.env;
const app = express()
const server = http.createServer(app);

const users=[{}]
app.use(cors())

const io=new Server(server)
io.on('connection',(socket)=>{
    console.log("new connection")
    
    socket.on('joined',({user})=>{
        users[socket.id]=user
        console.log(`${user} has joined`)
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`})
        socket.emit('welcome',{user:"Admin",message:`welcome to the chat,${users[socket.id]}`})
    })  
    socket.on('message', ({ message, id }) => { // Receive id along with the message
        io.emit('sendMessage', { user: users[id], message, id }); // Now id is defined here
    });
    
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:'Admin',message:`${users[socket.id]} has left`})
        console.log("user left")
    })
})
server.listen(PORT, (err) =>
  console.log(`server is running on port https://localhost:${PORT}`)
);
