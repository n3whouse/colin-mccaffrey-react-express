import React, { useState } from 'react'
import GigForm from './GigForm'

function LandingPage({ setIsLoggedIn }) {


  const handleClick = (e) => {
    e.preventDefault();
    <GigForm />
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    console.log('Logging out...')
    setIsLoggedIn(false);

  }

  return (
    <>
      <div className="landingContainer">

      <h1>Welcome back, Colin!</h1>
      <p>What would you like to change today?</p>
      <button className="landing-btn" onClick={handleClick}>Add/Edit/Delete A Gig</button>
      <button className="landing-btn">Add/Edit/Delete A Store Item</button>
        <button className="landing-btn" onClick={handleLogOut}>Log Out</button>
        

      </div>
    </>
  )
} 

export default LandingPage 
