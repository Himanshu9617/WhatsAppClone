import { Avatar,IconButton } from '@mui/material'
import React,{useEffect,useState} from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import "./css/Sidebar_css.css"
import SidebarChat from './SidebarChat';
import db, { auth } from './firebase';
import { collection, onSnapshot} from "firebase/firestore";
import { useStateValue } from './StateProvider';
import { signOut } from 'firebase/auth';


function Sidebar() {
    const [rooms, setRooms] = useState([]);

    const [{user},dispatch] = useStateValue();


    const [schVal, setSch] = useState("");



    useEffect(
        () =>
            onSnapshot(collection(db, "rooms"), (snapshot) => {
                setRooms(
                    snapshot.docs.map((doc) => {
                        return { data : doc.data(), id: doc.id };
                    })
                );
            }),
		[]);
  return (
    <div className='sidebar'>
        
            <div className='sidebar_header'>
                <Avatar src={user.photoURL} onClick = {e=>signOut(auth)}/>
                <div className='sidebar_header_right'>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>



            <div className='sidebar_search'>
                <div className='search_cont'>
                    <SearchIcon/>
                    <input type="text" value={schVal} onChange={(e=>{setSch(e.target.value)})} placeholder='Search or start a new chat'/>
                </div>
            </div>




        <div className='sidebar_constant'>
            <div className='sidebar_chats'>
                <SidebarChat addnewchat/>
                {   
                    rooms.filter((data=>{return `${data.data.name}`.toLowerCase().startsWith(schVal.toLowerCase())})).map(rooms=>{
                        return <SidebarChat key={rooms.id} id={rooms.id} name={rooms.data.name}/>
                })
                }
            </div>
        </div>
    </div>
  )
}
export default Sidebar

