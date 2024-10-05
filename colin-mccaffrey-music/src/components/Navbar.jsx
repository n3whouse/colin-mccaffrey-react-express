import React, { useState } from 'react';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import "../styles/Navbar.css"

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false)


  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
    
  return (
    <div className="navbar">
      <div className="leftSide">
        
        <div className="hiddenLinks" id={openLinks ? "open" : "close"}> 
          <Link to="/"> Home </Link>
          <Link to="/menu"> Performer </Link>
          <Link to="/about"> Engineer </Link>
          <Link to="/contact"> Media </Link>
          <Link to="/about"> About </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/menu"> Performer </Link>
        <Link to="/about"> Engineer </Link>
        <Link to="/contact"> Media </Link>
        <Link to="/about"> About </Link>
        <button onClick={toggleNavbar}>
          <MenuIcon />
        </button>
      </div>
    </div>
  )
  
}

export default Navbar
