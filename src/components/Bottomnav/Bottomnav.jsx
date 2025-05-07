'use client'; // This directive is needed for client-side components in Next.js

import React, { useContext, useState } from 'react';
import './Bottomnav.css'; // Make sure this CSS file is in the correct location
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormContext } from '../../context/FormContext';
import { UserContext } from '../../context/UserContext';

function Bottomnav() {
  const pathname = usePathname();
  const { closeForm, setCloseForm } = useContext(FormContext);
  const { user, setUser } = useContext(UserContext);

  // Helper function to check if the current path matches
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="bottom_nav">
      <div className="bottom_nav_links">
        <Link
          href="/"
          className={`bottom_nav_links ${isActive('/') ? 'active' : ''}`}
        >
          <i className='bx bx-home'></i>
          <p>Home</p>
        </Link>
        
        <Link
          href="/advertise"
          className={`bottom_nav_links ${isActive('/advertise') ? 'active' : ''}`}
        >
          <i className='bx bxs-business'></i>
          <p>Advertise</p>
        </Link>
        
        <Link
          href="/addListig"
          className={`bottom_nav_links ${isActive('/addListig') ? 'active' : ''}`}
        >
          <i className='bx bx-plus-circle'></i>
          <p>Add Listing</p>
        </Link>
        
        <Link
          href="/news"
          className={`bottom_nav_links ${isActive('/news') ? 'active' : ''}`}
        >
          <i className='bx bx-calendar'></i>
          <p>News</p>
        </Link>
        
        {user ? (
          <Link
            href="/account"
            className={`bottom_nav_links ${isActive('/account') ? 'active' : ''}`}
          >
            <i className='bx bx-user-circle'></i>
            <p>Account</p>
          </Link>
        ) : (
          <button 
            onClick={() => setCloseForm(!closeForm)} 
            className={`bottom_nav_links ${isActive('/account') ? 'active' : ''}`}
          >
            <i className='bx bx-user-circle'></i>
            <p>Login</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default Bottomnav;