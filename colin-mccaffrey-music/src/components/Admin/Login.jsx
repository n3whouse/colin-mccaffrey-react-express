import React from 'react'
import './Admin.css';

function Login({ onLogin }) {


  const handleLogin = () => {
    //Enter login validation logic
    onLogin();
  };

  return (
    <section>
<div className="loginModule">
      <input type="email" placeholder="email/username" />
        <input type="password" placeholder="password" />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </section>
  )
}

export default Login