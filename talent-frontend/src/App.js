import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'; 
import Navbar2 from './Components/Navbar2'; 
import Home from './Components/Home';
import About from './Components/About';
import Career from './Components/Career';
import Resources from './Components/Resources';
import ClientPrograms from './Components/Client Programs';
import ReferralProgram from './Components/Referral Program';
import FresherRecruiting from './Components/Fresher Recruiting';
import Choosing from './Components/Choosing';
import Signin_up from './Components/Signin_up';
import Page1 from './Components/Post A Job/Page1';
import Page2 from './Components/Post A Job/Page2';
import Page3 from './Components/Post A Job/Page3';
import Recruiter_signin_up  from './Components/Recruiter_signin_up'
import Profile from './Components/Profile';


function App() {
  const [isNavbarTwo, setIsNavbarTwo] = useState(false); 

  return (
    <Router>
      <div>
        {isNavbarTwo ? (
          <Navbar2 /> 
        ) : (
          <Navbar isNavbarTwo={isNavbarTwo} setIsNavbarTwo={setIsNavbarTwo} /> 
        )}

        <Routes>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/client-programs" element={<ClientPrograms />} />
          <Route path="/referral-program" element={<ReferralProgram />} />
          <Route path="/fresher-recruiting" element={<FresherRecruiting />} />
          <Route path="/Choosing" element={<Choosing setIsNavbarTwo={setIsNavbarTwo} />} />
          <Route path="/Signin_up" element={<Signin_up />} />
          <Route path='/Page1' element={<Page1/>}/>
          <Route path='/Page2' element={<Page2/>}/>
          <Route path='/Page3' element={<Page3/>}/>
          <Route path='/Recruiter_signin_up' element={<Recruiter_signin_up/>}/>
          <Route path="/signin" element={<Signin_up />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
