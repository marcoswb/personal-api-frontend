import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Root(){
  const { t } = useTranslation();

  const [name, setName] = useState('')
  const [short_description, setShortDescription] = useState('')
  const [whatsapp_link, setWhatsappLink] = useState('')
  const [about, setAbout] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(process.env.REACT_APP_ENDPOINT_API)
      response = await response.json()

      setName(response['name'])
      setShortDescription(response['short_description'])
      setWhatsappLink(`https://api.whatsapp.com/send/?phone=${response['number_phone']}&text=Olá ${response['name']}&app_absent=0`)
      setAbout(response['about'].split('\\n'))
      setSkills(response['skills'])
    }

    fetchMyAPI()
  }, [])

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
          {skills.map((x, i) =>
            <p>{about[i]}</p>
          )}
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