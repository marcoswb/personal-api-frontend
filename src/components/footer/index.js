import React, { useState, useEffect } from 'react'

import './style.css';

export default function Footer(){

  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [email_link, setEmailLink] = useState('')
  const [whatsapp_link, setWhatsappLink] = useState('')

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(process.env.REACT_APP_ENDPOINT_API)
      response = await response.json()

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
          <li><a href={linkedin} target="_blank"><i class="fa fa-linkedin-square"></i></a></li>
          <li><a href={github} target="_blank"><i class="fa fa-github"></i></a></li>
          <li><a href={email_link} target="_blank"><i class="fa fa-envelope"></i></a></li>
          <li><a href={whatsapp_link} target="_blank"><i class="fa fa-whatsapp"></i></a></li>
        </ul>
      </div>
    </footer>
  )
}