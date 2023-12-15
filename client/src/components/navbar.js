// Navbar.jsx

import React, { useState,useEffect } from 'react';
import './navbar.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading,getAccessTokenSilently } = useAuth0();



const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <nav>
      <div Class="navbar-container">
        <div Class="logo">COMPILER BOX</div>
        <div Class="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <div Class={`navbar-buttons ${showMenu ? 'show' : ''}`}>
          
              
              {
                isAuthenticated?(<>
                <div Class="avatar">
                <FontAwesomeIcon icon={faCircleUser} />
                </div>
                <h5>{user.nickname}</h5>                
                  <button className="custom-link"  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} >
                  LOG OUT
                 </button>

                 <button > <Link to="/Mycodes" className="custom-link">MY CODES</Link></button> 

                 </> )
                :(<button  className="custom-link"onClick={() => loginWithRedirect()}>LOG IN</button>
                
                )
              }
              

              <button><Link to="/" className="custom-link">COMPILER</Link></button>
          <button ><Link to="/help" className="custom-link">HELP</Link></button>
         
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
