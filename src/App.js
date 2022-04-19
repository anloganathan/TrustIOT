import './App.css';
import { useState } from 'react';

import { Card, Button } from 'react-bootstrap';
import NavbarComp from './Components/NavbarComp';
import Devices from './Components/Devices';
import Patients from './Components/Patients';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [nav, setNav] = useState("devices");

  return (
    <div className="App">
      <NavbarComp nav={nav} setNav={setNav} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </div>
  );
}

export default App;
