import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
// import Home from './Components/Home';
import About from './Components/About';
// import Career from './Components/Career';
import Resources from './Components/Resources';
import ClientPrograms from './Components/Client Programs';
import ReferralProgram from './Components/Referral Program';
import FresherRecruiting from './Components/Fresher Recruiting';
import Choosing from './Components/Choosing';
import JobSeekerLogin from './Components/login/JobSeekerLogin';
import RecruiterLogin from './Components/login/RecruiterLogin';
import JobSeekerRegister from './Components/Register/JobSeekerRegister';
import RecruiterRegister from './Components/Register/RecruiterRegister';
import Page3 from './Components/Post A Job/Page3';
import Page2 from './Components/Post A Job/Page2';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Page3 />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Page2 />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/client-programs" element={<ClientPrograms />} />
        <Route path="/referral-program" element={<ReferralProgram />} />
        <Route path="/fresher-recruiting" element={<FresherRecruiting />} />
        <Route path="/Choosing" element={<Choosing/>}/>
        <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
        <Route path="/login-recruiter" element={<RecruiterLogin />} />
        <Route path="/job-seeker-Register" element={<JobSeekerRegister />} />
        <Route path="/register-recruiter" element={<RecruiterRegister />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
