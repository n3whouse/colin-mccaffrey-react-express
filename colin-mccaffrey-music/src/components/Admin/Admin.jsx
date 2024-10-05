import React, { useState } from 'react';
import './Admin.css';
import Login from './Login.jsx';
import GigForm from './GigForm.jsx';
function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogIn = () => {
    setIsLoggedIn(true);
  }

  return (
    <div className="adminContainer">
      <h2>Admin Panel</h2>
      {!isLoggedIn ? <Login onLogin={handleLogIn} /> : <GigForm />}
    </div>
  )


}

export default Admin