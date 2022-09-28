import React from 'react'
import { Avatar} from '@mui/material'
import "./css/Sidebar_css.css"
import db from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
function SidebarChat({id,name,addnewchat}) {

    const createChat=()=>{
        const roomName = prompt("Please enter group name.");
        if(roomName){
            addDoc(collection(db,"rooms"),{
                name:roomName
            });
        }
    }

  return (
    !addnewchat ? (
        <Link to={`/room/${id}`} className='sidebar_link_chat'>
            <div className='sidebar_chat'>
                <Avatar/>
                    <div className='sidebar_chat_info'>
                        <h3>{name}</h3>
                </div>
            </div>
        </Link>
    ) 
    :(
        <div className='sidebar_chat' onClick={createChat}>
            <h3>Start a new chat</h3>
        </div>
    
  )
  )
}
export default SidebarChat