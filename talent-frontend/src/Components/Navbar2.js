import React, { useState, useContext } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import './Navbar.css';
import UserContext from './UserContext'; 

const Navbar2 = () => {
    const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null); 
    closeMenu();
    navigate('/Recruiter_signin_up')
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>Talent96</Link>
        </div>

        <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/Home" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/post-a-job" onClick={closeMenu}>Post a Job</Link></li>
          {user ? ( 
            <li>
              <button className='logoutbtn' onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li><Link to="/Recruiter_signin_up" onClick={closeMenu}>Recruiter Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar2;