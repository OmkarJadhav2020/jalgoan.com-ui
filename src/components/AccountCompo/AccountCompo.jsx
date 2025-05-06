'use client';

import React, { useState } from 'react';
import AccountLinks from './AccountLinks';
import './AccountCompo.css';
import AccountMainCompo from './AccountMainCompo';

function AccountCompo() {
  const [activeLink, setActiveLink] = useState('myProfile');

  return (
    <div className="account_container">
      <div className="account_links">
        <AccountLinks activeLink={activeLink} setActiveLink={setActiveLink}/>
      </div>
      <div className="account_main">
        <AccountMainCompo activeLink={activeLink}/>
      </div>
    </div>
  );
}

export default AccountCompo;