import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Career from './Components/Career';
import Resources from './Components/Resources';
import ClientPrograms from './Components/Client Programs';
import ReferralProgram from './Components/Referral Program';
import FresherRecruiting from './Components/Fresher Recruiting';
import Login from './Components/Login';
import Register from './Components/Register';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/client-programs" element={<ClientPrograms />} />
        <Route path="/referral-program" element={<ReferralProgram />} />
        <Route path="/fresher-recruiting" element={<FresherRecruiting />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
