import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Root(){

  const [name, setName] = useState('')
  const [short_description, setShortDescription] = useState('')
  const [whatsapp_link, setWhatsappLink] = useState('')
  const [about, setAbout] = useState('')
  const [skills, setSkills] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(process.env.REACT_APP_ENDPOINT_API)
      response = await response.json()

      setName(response['name'])
      setShortDescription(response['short_description'])
      setWhatsappLink(`https://api.whatsapp.com/send/?phone=${response['number_phone']}&text=Olá ${response['name']}&app_absent=0`)
      setAbout(response['about'])
      setSkills(response['skills'])
    }

    fetchMyAPI()
  }, [])

  return (
      <div>
        <Navbar/>
        <div class='main-content'>
          <div id='carousel'>
            <h1>Olá, meu nome é {name}.</h1>
            <h2>{short_description}</h2>
            <a href={whatsapp_link}>Vamos conversar?</a>
          </div>
          <div id='about'>
            <p>{about}</p>
          </div>
          <div>
            <div>
              <h3>skills:</h3>
              {skills.map((x, i) => 
                <p key={i}>{skills[i]['name']}: {skills[i]['link_icon']}</p>
              )}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  )
}