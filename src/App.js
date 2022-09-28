import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './Main';


function App() {
  
  return <Router>
        <Routes>
            <Route exact path="/" element={<Main/>}/>
            <Route path="/room/:roomId" element={<Main/>}/>
            <Route path = "/login" element={<login/>}/>
          </Routes>
  </Router>
  
 
}
export default App;