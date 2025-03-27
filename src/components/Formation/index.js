import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { fetchFormationData } from '../../api';

import './style.css';

export default function Formation(){
  const { i18n } = useTranslation();

  const [formations, setFormations] = useState([])
  
  async function loadAllFormation(){
    let response;

    if(sessionStorage.getItem('formationData') == null){
      response = await fetchFormationData(i18n.language)
    } else {
      response = loadDataStorage(i18n.language)
    }

    setFormations(response)
  }

  function loadDataStorage(language){
    const savedData = sessionStorage.getItem('formationData');
    const result = savedData ? JSON.parse(savedData) : null;
    return result[language];
  }

  useEffect(() => {
    loadAllFormation()
  }, [])

  useEffect(() => {
      const handleLanguageChange = (language) => {
        loadAllFormation()
      };
  
      i18n.on('languageChanged', handleLanguageChange);
      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    }, [i18n, formations]);
      
  return (
      <div>
        <Navbar/>
        <div class='main-content'>
          {formations.map((x, i) => 
          <div class='formation'>
            <h2>{formations[i]['institution']}</h2>
            <h3>{formations[i]['formation']}</h3>
            <p key={i}>{formations[i]['period']}</p>
          </div>
          )}
        </div>
        <Footer/>
      </div>
  )
}