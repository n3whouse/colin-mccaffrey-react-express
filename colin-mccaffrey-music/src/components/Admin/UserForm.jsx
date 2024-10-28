import React, { useState, useEffect } from 'react'

function UserForm({ setShowUserForm, existingUser, onUserSubmit }) {
  const [user, setUser] = useState({
    isAdmin: false,
    name: '',
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (existingUser) {
      setUser({
        isAdmin: existingUser.isAdmin,
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
        password: ''
      });
    }
  }, [existingUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User data submitted', user);
    await onUserSubmit(user);
    setShowUserForm(false);
  }

  const handleDelete = async () => {
    console.log('Deleting user:', user.username);
    setShowUserForm(false);
  }

  return (
    <form onSubmit={handleSubmit} className="userForm">

      <label>

        <input
          type="checkbox"
          name="isAdmin"
          checked={user.isAdmin}
          onChange={handleChange}
        />
        Is Admin
      </label>

      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />

      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        required={!existingUser} // Password is required only for new users
      />
      <button type="submit">{existingUser ? 'Update User' : 'Create User'}</button>
      {existingUser  && <button type="button" onClick={handleDelete}>Delete User</button>}
      <button type="button" onClick={() => setShowUserForm(false)}>Close</button>
    </form>
  )
}

export default UserForm