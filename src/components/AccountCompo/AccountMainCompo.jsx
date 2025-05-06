'use client';

import React from 'react';
import MyProfile from './MyProfile';
import Likedpage from './Likedpage';
import Listingspage from './Listingspage';

function AccountMainCompo({activeLink}) {
  return (
    <div className="account_main_compo">
      {activeLink === 'myProfile' && (
        <MyProfile />
      )}
      {activeLink === 'likedPages' && (
        <Likedpage />
      )}
      {activeLink === 'listinges' && (
        <Listingspage />
      )}
    </div>
  );
}

export default AccountMainCompo;