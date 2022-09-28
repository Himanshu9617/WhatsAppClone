import React, {useEffect} from 'react'
import Chat from './Chat'
import { auth } from './firebase';
import Login from './Login';
import Sidebar from './Sidebar'
import { useStateValue } from './StateProvider';

function Main() {
  const [{user},dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      dispatch({
        type:"SET_USER",
        user:user
      })
    })
  },[])
  

  return (
    <>
    {user ? (
      <div className="App">
        <div className='app_body'>
            <Sidebar/>
            <Chat/>
        </div>
    </div>
    ): <Login/>}
    </>
  )
}

export default Main