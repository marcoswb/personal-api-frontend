import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { fetchRootData } from '../../api';

import './style.css';

export default function Footer(){
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [email_link, setEmailLink] = useState('')
  const [whatsapp_link, setWhatsappLink] = useState('')

  function loadDataStorage(language){
    const savedData = sessionStorage.getItem('rootData');
    const result = savedData ? JSON.parse(savedData) : null;
    return result[language];
  }

  useEffect(() => {
    async function fetchMyAPI() {
      let response;
  
      if(sessionStorage.getItem('rootData') == null){
        response = await fetchRootData(i18n.language)
      } else {
        response = loadDataStorage(i18n.language)
      }

      setLinkedin(response['linkedin_link'])
      setGithub(response['github_link'])
      setEmailLink(`mailto:${response['email']}?subject=Contato%20via%20site`)
      setWhatsappLink(`https://api.whatsapp.com/send/?phone=${response['number_phone']}&text=Olá ${response['name']}&app_absent=0`)
    }

    fetchMyAPI()
  }, [])


  return (
    <footer>
      <div class="footer-content">
        <ul class="socials">
            <li><a href={linkedin} target="_blank" rel="noopener noreferrer"><i class="fa fa-linkedin-square"></i></a></li>
            <li><a href={github} target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i></a></li>
            <li><a href={email_link} target="_blank" rel="noopener noreferrer"><i class="fa fa-envelope"></i></a></li>
            <li><a href={whatsapp_link} target="_blank" rel="noopener noreferrer"><i class="fa fa-whatsapp"></i></a></li>
        </ul>
        <div id="footer-rigth">
          <label for="language-select">{t('language')}: </label>
          <select id="language-select" name="select" onChange={handleChangeLanguage} value={i18n.language}>
            <option value="pt" selected>{t('portuguese')}</option>
            <option value="en">{t('english')}</option>
          </select>
        </div>
      </div>
    </footer>
  )
}