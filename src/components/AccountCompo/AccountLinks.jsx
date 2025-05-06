'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './AccountCompo.css';

function AccountLinks({activeLink, setActiveLink}) {
  const [profileLinks, setShowProfinks] = useState(false);
  const router = useRouter();

  const logoutFuntion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenKey');
    localStorage.setItem("hasVisited", 'false');
    router.push('/');
    window.location.reload(); // Refresh the page
  };

  return (
    <div className={`account_links_content ${profileLinks ? 'show_profileLinks' : ''}`}>
      <ul>
        <li onClick={() => setActiveLink('myProfile')} className={`${activeLink === 'myProfile' ? 'active' : ''}`}>
          <i className='bx bx-user-circle'></i><p>My Profile</p>
        </li>
        <li onClick={() => setActiveLink('likedPages')} className={`${activeLink === 'likedPages' ? 'active' : ''}`}>
          <i className='bx bx-heart'></i><p>Liked Pages</p>
        </li>
        <li onClick={() => setActiveLink('listinges')} className={`${activeLink === 'listinges' ? 'active' : ''}`}>
          <i className='bx bx-notepad'></i><p>Listings</p>
        </li>
        <li onClick={() => logoutFuntion()} className={`${activeLink === 'logout' ? 'active' : ''}`}>
          <i className='bx bxs-user-x'></i><p>Log Out</p>
        </li>
      </ul>
      <div className="slide_account_link" onClick={() => setShowProfinks(!profileLinks)}>
        <i className='bx bxs-right-arrow'></i>
      </div>
    </div>
  );
}

export default AccountLinks;