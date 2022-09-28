import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MicNoneIcon from '@mui/icons-material/MicNone';
import "./css/Chat.css"
import { useParams } from 'react-router';
import db from './firebase';
import { addDoc, collection,getDocs, onSnapshot, orderBy,query} from 'firebase/firestore';
import 'firebase/compat/firestore';
import { useStateValue } from './StateProvider';



function Chat() {

  const {roomId} = useParams();
  const [roomName,setRoomName] = useState([]);
  const [messages,setMessages] = useState([]);
  const [input,setInput] = useState("");

  const [{user},dispatch] = useStateValue();


  useEffect(()=>{
    getDocs(collection(db,"rooms")).then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        if(doc.id === roomId){
          setRoomName(doc._document.data.value.mapValue.fields.name.stringValue);
        }
      }); 
    });



  const q = query(collection(db, `rooms/${roomId}`,"message"), orderBy("timestamp",'asc'));
    onSnapshot(q, (snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => {
                        return  doc.data();
                    })
                );
            })
  },[roomId])
  
 const sendMessage=(e)=>{
  e.preventDefault();
  if(input===""){
     return alert("No message")
  }
  else{
    addDoc(collection(db,`rooms/${roomId}/`,"message"),{
      name:user.displayName,
      message: input,
      timestamp:  new Date(),
    });
  }
  setInput("");
 }


  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar/>
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
            </div>
            <div className='header_right'>
              <IconButton>
                <VideocamIcon/>
              </IconButton>
              <IconButton>
                <CallIcon/>
              </IconButton>
              <IconButton>
                <SearchIcon/>
              </IconButton>
              <IconButton>
                <ArrowDropDownIcon/>
              </IconButton>
            </div>
        </div>

      <div className='chat_body'>
        {
          messages.map(message=>(
            <p  key={Math.random()*10} className={`chat_message ${user.displayName===message.name && "chat_sent"}`}>
              <span className="chat_name">{`${message.name}`.split(" ")[0]}</span>
              {message.message}
            </p>
          ))
        }
        </div>




      <div className='chat_footer'>
        <IconButton><EmojiEmotionsIcon/></IconButton>
        <IconButton><AttachmentIcon/></IconButton>
        <form onSubmit={sendMessage}>
          <input type = "text" value = {input} placeholder='Type a message' onChange={
            e=>setInput(e.target.value)}/>
          <input type= "submit"/>
        </form>
        <IconButton><MicNoneIcon/></IconButton>
      </div>

    </div>
  )
}

export default Chat