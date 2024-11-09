import React, { useState } from 'react';
import './Admin.css';
import Login from './Login.jsx';
import LandingPage from './LandingPage.jsx';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

/* 


⁡⁢⁣⁣NEXT UP... ⁡
-- 𝗔𝗗𝗠𝗜𝗡 𝗣𝗔𝗡𝗘𝗟 𝗥𝗘𝗤𝗨𝗜𝗥𝗘𝗠𝗘𝗡𝗧𝗦 --
⁡⁣⁢⁣1. Admin Login⁡
  ⁡⁢⁢⁢A. "Welcome, ${user}!" upon login
  B. Logout button
  C. ...jwt and bcrypt to fill in that info.⁡

⁡⁣⁢⁣2. Admin Dashboard⁡
+𝘮𝘶𝘴𝘵 𝘩𝘢𝘷𝘦
  ⁡⁢⁢⁢A. ability to CRUD shows and display updates to UpcomingShows.jsx
  B. ability to CRUD media and display updates to Media.jsx
  C. ability to CRUD releases and display updates to Store.jsx (and maybe another component?)⁡
+𝘯𝘪𝘤𝘦 𝘵𝘰 𝘩𝘢𝘷𝘦
  ⁡⁢⁢⁢A. ability to edit bio and other component bodies via dashboard
  B. Admin ability to CRUD users
  C. ...and display all in a secret admin panel that pops out on successful login/token validation⁡

⁡⁢⁣⁣Next Steps⁡

  ⁡⁢⁢⁢► Create a User Schema with the necessary fields.
  ► Implement password hashing using a library like bcrypt.
  ► Generate and verify tokens using a library like jsonwebtoken.
  ► Create a login endpoint that accepts a username and password, hashes the password, and generates a token if the credentials are valid.
  ► Implement token verification and refresh mechanisms in your API.
⁡
*/

  return (
    <div className="adminContainer">
      <h2>Admin Panel</h2>
      {!isLoggedIn ? <Login onLogin={handleLogin} /> : <LandingPage setIsLoggedIn={setIsLoggedIn} />}
    </div>
  )


}

export default Admin;