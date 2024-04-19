import React, { useEffect,useState } from 'react'
import './Chat.css'
import sendImg from '../../images/sendBtn.png'
import chatLogo from '../../images/logo.png'
import {user} from '../join/Join'
import socketIO from 'socket.io-client'
import Message from '../Message/Message'
import ReactScrollToBottom  from 'react-scroll-to-bottom'
const ENDPOINT = 'http://localhost:5000/';
let socket;
const Chat = () => {
    const [id,setId]=useState('')
    const [messages,setMessages]=useState([])
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id }); // Pass the id along with the message
        document.getElementById('chatInput').value = "";
    }
    
    useEffect(()=>{
       socket = socketIO(ENDPOINT, { transports: ['websocket'] });
    socket.on('connect',()=>{
        alert('connected')
        setId(socket.id)
    })
    socket.emit('joined',{user})
    socket.on('welcome',(data)=>{
        console.log(data.user,data.message)
        setMessages([...messages,data])
    })
    socket.on('userJoined',(data)=>{
        console.log(data.user,data.message)
        setMessages([...messages,data])

    })
    socket.on('leave',(data)=>{
        setMessages([...messages,data])
    })
    return ()=>{
        socket.disconnect();
        socket.off();
    }
  },[]) 
  useEffect(()=>{
    socket.on('sendMessage',(data)=>{
        setMessages([...messages,data])
        console.log(data.user,data.message,data.id)
    })
    return()=>{
        socket.off()
    }
  },[messages])
  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
                <img src={chatLogo} alt="chatLogo" />
                <h1>TalkPoint</h1>
            </div>
            <ReactScrollToBottom className='chatBox'>
             {messages.map((item,i)=><Message user={item.id===id?'':item.user}     message={item.message} classs={item.id===id?'right':'left'}/>)}
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input type="text" onKeyDown={(event)=>event.key==='Enter'?send():null}  id='chatInput'/>
                <button  onClick={send} className='sendBtn'><img src={sendImg} alt="send logo"/></button>
            </div>
        </div>
    </div>
  )
}

export default Chat