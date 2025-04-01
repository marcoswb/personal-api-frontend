import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { fetchExperienceData } from '../../api';

import './style.css';

export default function Experience(){
  const { i18n } = useTranslation();

  const [experiences, setExperiences] = useState([])
  
  async function loadAllExperiences(){
    let response;

    if(sessionStorage.getItem('experienceData') == null){
      response = await fetchExperienceData(i18n.language)
    } else {
      response = loadDataStorage(i18n.language)
    }

    setExperiences(response)
  }

  function loadDataStorage(language){
    const savedData = sessionStorage.getItem('experienceData');
    const result = savedData ? JSON.parse(savedData) : null;
    return result[language];
  }

  useEffect(() => {
    loadAllExperiences()
  }, [])

  useEffect(() => {
      const handleLanguageChange = (language) => {
        loadAllExperiences()
      };
  
      i18n.on('languageChanged', handleLanguageChange);
      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    }, [i18n, experiences]);
      
  return (
      <div>
        <Navbar/>
        <div class='main-content'>
          {experiences.map((x, i) => 
          <div class='experience'>
            <h2>{experiences[i]['company']}</h2>
            <h3>{experiences[i]['ocuppation']}</h3>
            <p key={i}>{experiences[i]['period']}</p>
          </div>
          )}
        </div>
        <Footer/>
      </div>
  )
}