import React, { useState } from 'react'
import GigForm from './GigForm'

function LandingPage({ setIsLoggedIn }) {
  const [showGigForm, setShowGigForm] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowGigForm(true);
    
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    console.log('Logging out...')
    setIsLoggedIn(false);

  }

  return (
    
      <div className="landingContainer">
      <h1>Welcome back, Colin!</h1>
      <p>What would you like to change today?</p>
      <button className="landing-btn" onClick={handleClick}>Add/Edit/Delete A Gig</button>
      <button className="landing-btn">Add/Edit/Delete A User</button>
      <button className="landing-btn">Add/Edit/Delete A Store Item</button>
        <button className="landing-btn" onClick={handleLogOut}>Log Out</button>
      
      {/* 
        ⁡⁢⁣⁣TODO:
        Now that the GigForm is able to be toggled with the first button, the next objective is to repeat the process with the edit user and edit store items. But FIRST...
        ► The endpoints should be connected to the database
        ► The database should be connected to the frontend
        ► The endpoints should be abstracted with the .env file.⁡
        */}
      
      <hr />
    <div className="gigForm">
        {showGigForm && <GigForm setShowGigForm={setShowGigForm} />}
        
      </div>
      </div>
  )
} 

export default LandingPage 
