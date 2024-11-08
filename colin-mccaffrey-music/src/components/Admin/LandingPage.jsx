import React, { useState } from 'react'
import GigForm from './GigForm'
import UserForm from './UserForm';
import ReleaseForm from './ReleaseForm';

function LandingPage({ setIsLoggedIn }) {
  const [showGigForm, setShowGigForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showReleaseForm, setShowReleaseForm] = useState(false);

  const handleGigForm = (e) => {
    e.preventDefault();
    setShowGigForm(true);
    setShowUserForm(false);
    setShowReleaseForm(false);
  }

  const handleUserForm = (e) => {
    e.preventDefault();
    setShowUserForm(true);
    setShowGigForm(false);
    setShowReleaseForm(false);
  }

  const handleReleaseForm = (e) => {
    e.preventDefault();
    setShowReleaseForm(true);
    setShowGigForm(false);
    setShowUserForm(false);
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
      <button className="landing-btn" onClick={handleGigForm}>Add/Edit/Delete A Gig</button>
      <button className="landing-btn" onClick={handleUserForm}>Add/Edit/Delete A User</button>
      <button className="landing-btn" onClick={handleReleaseForm}>Add/Edit/Delete A Store Item</button>
        <button className="landing-btn" onClick={handleLogOut}>Log Out</button>
      
      {/* 
        ⁡⁢⁣⁣TODO:
        Now that the GigForm is able to be toggled with the first button, the next objective is to repeat the process with the edit user and edit store items. But FIRST...
        ► The endpoints should be connected to the database ⁡⁢⁢⁢[ DONE ]⁡
        ⁡⁢⁣⁣► The database should be connected to the frontend ⁡⁣⁢⁣[ NEXT ]
        ⁡⁢⁣⁣► The endpoints should be abstracted with the .env file. ⁡⁣⁢⁣[ AFTER NEXT]⁡
        */}
      
      <hr />
    <div className="gigForm">
        {showGigForm && <GigForm setShowGigForm={setShowGigForm} />}
      </div>
      <div className="userForm">
        {showUserForm && <UserForm setShowUserForm={setShowUserForm} />}
        <div className="releaseForm">
          {showReleaseForm && <ReleaseForm setShowReleaseForm={setShowReleaseForm} />}
        </div>
      </div>
      </div>
  )
} 

export default LandingPage 
