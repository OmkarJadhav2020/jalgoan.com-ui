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

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const { closeForm, setCloseForm } = useContext(FormContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fix: Only check hasVisited once when component mounts
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited === null || hasVisited === "false") {
      // Set this once, not in a way that would cause re-renders
      setCloseForm(false); // Show the form instead of toggling
    }
    // DO NOT include closeForm or setCloseForm in the dependency array
  }, []);  // Empty dependency array = run only once on mount

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
    </div>
  );
}