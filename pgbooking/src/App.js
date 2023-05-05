import React from "react"
import './App.css';

import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homescreen from './screens/Homescreen'
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Contactusscreen from "./screens/Contactusscreen";
import Aboutusscreen from "./screens/Aboutusscreen";
import Landingscreen from "./screens/Landingscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <BrowserRouter>
            <Routes>
              <Route path='/home' element={<Homescreen/>}></Route>
              <Route path='/book/:roomid' element={<Bookingscreen/>}></Route>
              <Route path='/register' element={<Registerscreen/>}></Route>
              <Route path='/login' element={<Loginscreen/>}></Route>
              <Route path='/contact-us' element={<Contactusscreen/>}></Route>
              <Route path='/about-us' element={<Aboutusscreen/>}></Route>
              <Route path='/profile' element={<Profilescreen/>}></Route>
              <Route path='/admin' element={<Adminscreen/>}></Route>
              <Route path='/' element={<Landingscreen/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
