'use client';

import React, { useState, useContext, useEffect } from 'react';
import './AccountCompo.css';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

function MyProfile() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || user.phone_number || '',
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile update functionality will be implemented in next phase.');
    console.log(formData);
  };

  return (
    <div className="myProfile_content">
      <h1>My Profile</h1>
      <div className="user_info_form">
        <form onSubmit={handleSubmit}>
          <div className="username_input">
            <p>Username</p>
            <input 
              type="text" 
              name='username' 
              value={formData.username} 
              onChange={handleChange}
              placeholder='@username' 
            />
          </div>
          <div className="name_input">
            <p>Name</p>
            <div>
              <input 
                type="text" 
                name='firstName' 
                value={formData.firstName} 
                onChange={handleChange}
                placeholder='First Name' 
              />
              <input 
                type="text" 
                name='lastName' 
                value={formData.lastName} 
                onChange={handleChange}
                placeholder='Last Name' 
              />
            </div>
          </div>
          <div className="email_input">
            <p>E-mail</p>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder='Email' 
            />
          </div>
          <div className="update_btn">
            <button type='submit'>Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;