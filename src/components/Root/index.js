import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { fetchRootData, fetchExperienceData, fetchFormationData, fetchProjectsData, fetchBlogData } from '../../api';

import './style.css';

export default function Root(){
  const { t, i18n } = useTranslation();

  const [name, setName] = useState('')
  const [short_description, setShortDescription] = useState('')
  const [whatsapp_link, setWhatsappLink] = useState('')
  const [about, setAbout] = useState('')
  const [skills, setSkills] = useState([])
  
  async function loadAll(){
    let response;

    if(sessionStorage.getItem('rootData') == null){
      response = await fetchRootData(i18n.language)
    } else {
      response = loadDataStorage(i18n.language)
    }

    setName(response['name'])
    setShortDescription(response['short_description'])
    setWhatsappLink(`https://api.whatsapp.com/send/?phone=${response['number_phone']}&text=Olá ${response['name']}&app_absent=0`)
    setAbout(response['about'])
    setSkills(response['skills'])
  }

  function loadDataStorage(language){
    const savedData = sessionStorage.getItem('rootData');
    const result = savedData ? JSON.parse(savedData) : null;
    return result[language];
  }

  async function loadAnotherContents(){
    await fetchExperienceData(i18n.language)
    await fetchFormationData(i18n.language)
    await fetchProjectsData(i18n.language)
    await fetchBlogData(i18n.language)
  }

  useEffect(() => {
    loadAll()
    loadAnotherContents()
  }, [])

  useEffect(() => {
      const handleLanguageChange = (language) => {
        loadAll()
      };
  
      i18n.on('languageChanged', handleLanguageChange);
      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    }, [i18n, name]);

  return (
      <div>
        <Navbar/>
        <div class='main-content'>
          <div id='carousel'>
            <h1>{t('greeting', { name })}</h1>
            <h2>{short_description}</h2>
            <a href={whatsapp_link} id="whatsapp-button">{t('whatsappButton')}</a>
          </div>
          <div id='about'>
          <p>{about}</p>
          </div>
          <h2 class="subtitle">{t('skillsSubtitle')}</h2>
          <div id='skills'>
            {skills.map((x, i) =>
              <div class='item-skill'>
                <img src={skills[i]['link_icon']} alt='imagem da skill'/>
                <p key={i}>{skills[i]['name']}</p>
              </div>
            )}
          </div>
        </div>
        <Footer/>
      </div>
  )
}