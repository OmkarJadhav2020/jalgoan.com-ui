'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import './Navbar.css';
import { assets } from '../../assets/assets';
import Search from './Search';
import axios from 'axios';
import { FormContext } from '../../context/FormContext';
import { UserContext } from '../../context/UserContext';
import { LoginContext } from '../../context/LoginContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_DJANGO_API 
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

const Navbar = () => {
    const { isLogin, setIsLogin } = useContext(LoginContext);
    const { user, setUser } = useContext(UserContext);
    const { closeSpecial, setCloseSpecial } = useContext(FormContext);
    const { closeForm, setCloseForm } = useContext(FormContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            await client.post('/app/logout/', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('authToken');
            setUser(null);
            setIsLogin(false);
            console.log('Logout successful');
        } catch (error) {
            console.error('Error during logout', error);
        }
    };

    return (
        <div className='header'>
            <div className="navbar">
                <Link href='/'>
                    <div className="nav_logo">
                        <img className="icon" src={assets.icon} alt="" />
                        <img className="logo" src={assets.logo} alt="" />
                    </div>
                </Link>
                <div className="nav_links">
                    <ul className="navbar_menu">
                        <Link href='/'>
                            <li>Home</li>
                        </Link>
                        <Link href='/addListig'>
                            <li>Add Listing</li>
                        </Link>
                        <Link href='/advertise'>
                            <li>Advertise</li>
                        </Link>
                        <Link href='/news'>
                            <li>News</li>
                        </Link>
                    </ul>
                    <div className="nav_login">
                        {user ? (
                            <>
                                <Link href='/account'><p className="login_btn">Account: {user?.phone_number}</p></Link>
                            </>
                        ) : (
                            <p onClick={() => setCloseForm(!closeForm)} className="login_btn">Signup/Login</p>
                        )}
                        <i onClick={()=>setCloseSpecial(!closeSpecial)}  className='menu bx bx-menu'></i>
                    </div>
                </div>
            </div>
            <Search />
        </div>
    );
}

export default Navbar;