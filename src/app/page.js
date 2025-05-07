'use client';

import React, { useState, useEffect, useContext } from "react";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Stocktickle from '../components/Stocktickle/Stocktickle';
import Advertise from '../components/Advertise/Advertise';
import Services from '../components/Services/Services';
import Categorytile from '../components/Categorytile/Categorytile';
import RelatedArticles from '../components/Releatedarticles/Releatedarticles';
import SpecialSections from '../components/SpecialSections/SpecialSections';
import LoginSignup from '../components/LoginSignup/LoginSignup';
import { FormContext } from "../context/FormContext";
import { UserContext } from '../context/UserContext';
import Bottomnav from "@/components/Bottomnav/Bottomnav";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const { closeForm, setCloseForm, initialized } = useContext(FormContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Only run if the form context has been initialized
    if (initialized) {
      const token = localStorage.getItem('token');
      const hasVisited = localStorage.getItem('hasVisited');

      // Only show form if user is not logged in AND hasn't visited before
      if (!token && (!hasVisited || hasVisited === 'false')) {
        setCloseForm(false);
      }
    }
    // Only depend on initialized so this runs just once after initialization
  }, [initialized, setCloseForm]);

  return (
    <div className="main_section">
      <Navbar />
      <Stocktickle />
      <Advertise />
      <Services />
      <Categorytile />
      <RelatedArticles />
      <SpecialSections />
      <LoginSignup />
      <Bottomnav />
    </div>
  );
}