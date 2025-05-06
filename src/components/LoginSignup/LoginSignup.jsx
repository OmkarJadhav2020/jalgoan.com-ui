'use client';

import React, { useState, useContext, useEffect } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { FormContext } from '../../context/FormContext';
import { UserContext } from '../../context/UserContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_DJANGO_API });

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

function LoginSignup() {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const { user, setUser, isLogin, setIsLogin } = useContext(UserContext);
  const { closeForm, setCloseForm } = useContext(FormContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isNumber, setIsNumber] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const getCsrfToken = async () => {
    try {
      const response = await axios.get(`${djangoApi}/app/csrf-token/`);
      console.log('Fetched CSRF Token:', response.data.csrfToken); // Log token for debugging
      return response.data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const csrfToken = await getCsrfToken();

    try {
      const response = await axios.post(`${djangoApi}/app/register/`, {
        phone_number: phoneNumber,
        password: userPassword
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
        }
      });

      handleLoginSubmit(e);
    } catch (error) {
      console.error('Registration failed', error);
      setErrorMessage('Registration failed');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = await getCsrfToken();

    try {
      const response = await axios.post(`${djangoApi}/app/login/`, {
        phone_number: phoneNumber,
        password: userPassword
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true
      });

      const { user, token } = response.data;
      setUser(user);
      setIsLogin(true);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setCloseForm(true);
      console.log('Login successful', user);
      localStorage.setItem("hasVisited", "true");

      // Fetch token key
      await getTokenKey(csrfToken);
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Login failed');
    }
  };

  const getTokenKey = async (csrfToken) => {
    try {
      const response = await axios.post(`${djangoApi}/app/tokenKey/`, {
        phone_number: phoneNumber,
        password: userPassword
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        // Store token in localStorage
        localStorage.setItem('tokenKey', response.data.token);
        console.log('Token stored successfully:', response.data.token);
      } else {
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching token key:', error);
      setErrorMessage('Error fetching token key');
    }
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await client.get('/app/user/');
          setUser(res.data.user);
          setIsLogin(true);
        } catch (error) {
          setUser(null);
          setIsLogin(false);
        }
      }
    };

    checkUserSession();
  }, [setUser, setIsLogin]);

  const registerFormId = "register-form";
  const loginFormId = "login-form";

  return (
    <div className={`login_signup_container ${closeForm ? "close_form" : ""}`}>
      <div className="login_form">
        <div className="close_btn">
          <i onClick={() => setCloseForm(!closeForm)} className='bx bx-x'></i>
        </div>
        <form onSubmit={handleSubmit} className={`${isNumber ? "isNumber" : "noForm"}`}>
          <h1>Welcome to Jalgaon.Com</h1>
          <p>Register to personalize your experience</p>
          <div className="hr_line"></div>

          <label htmlFor={`${registerFormId}-mobile-number`}>Mobile Number</label>
          <div className="number_input">
            <img src={assets.flag} alt="Flag" />
            <input
              type="number"
              name="phone_number"
              value={phoneNumber}
              id={`${registerFormId}-mobile-number`}
              placeholder='phone number'
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10) {
                  setPhoneNumber(value);
                }
              }}
              required
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <label htmlFor={`${registerFormId}-user-password`}>Password</label>
          <div className="number_input">
            <img src={assets.flag} alt="Flag" />
            <input 
              type="password" 
              placeholder='password' 
              name='password' 
              value={userPassword} 
              id={`${registerFormId}-user-password`} 
              onChange={(e) => setUserPassword(e.target.value)} 
              required 
            />
          </div>
          <span>By Login or Signup I accept terms and conditions</span>
          {errorMessage && <p className="error_message">{errorMessage}</p>}
          <div className="submit_button">
            <button type="submit">
              <span>Continue</span>
              <i className='bx bx-right-arrow-alt'></i>
            </button>
          </div>
          <div className="back_btn_login">
            <p onClick={() => setIsNumber(!isNumber)}>Already have an <span>account</span></p>
          </div>
        </form>
        <form onSubmit={handleLoginSubmit} className={`${!isNumber ? "" : "noForm"}`}>
          <h1>Welcome to Jalgaon.Com</h1>
          <p>Login to personalize your experience</p>
          <div className="hr_line"></div>

          <label htmlFor={`${loginFormId}-mobile-number`}>Mobile Number</label>
          <div className="number_input">
            <img src={assets.flag} alt="Flag" />
            <input
              type="number"
              name="phone_number"
              value={phoneNumber}
              id={`${loginFormId}-mobile-number`}
              placeholder='phone number'
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10) {
                  setPhoneNumber(value);
                }
              }}
              required
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <label htmlFor={`${loginFormId}-user-password`}>Password</label>
          <div className="number_input">
            <img src={assets.flag} alt="Flag" />
            <input 
              type="password" 
              placeholder='password' 
              name='password' 
              value={userPassword} 
              id={`${loginFormId}-user-password`} 
              onChange={(e) => setUserPassword(e.target.value)} 
              required 
            />
          </div>
          <span>By Login or Signup I accept terms and conditions</span>
          {errorMessage && <p className="error_message">{errorMessage}</p>}
          <div className="submit_button">
            <button type="submit">
              <span>Continue</span>
              <i className='bx bx-right-arrow-alt'></i>
            </button>
          </div>
          <div className="back_btn_login">
            <p onClick={() => setIsNumber(!isNumber)}>Create new <span>account</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;