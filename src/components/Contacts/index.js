import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Contacts(){

  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [email, setEmail] = useState('')
  const [number_phone, setNumberPhone] = useState('')

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/contacts`)
      response = await response.json()

      setLinkedin(response['linkedin_link'])
      setGithub(response['github_link'])
      setEmail(`mailto:${response['email']}?subject=Contato%20via%20site`)
      setNumberPhone(`https://wa.me/${response['number_phone']}`)
    }

    fetchMyAPI()
  }, [])
      
  return (
      <div>
        <Navbar/>
        <div class='main-content'>
          <a href={linkedin} target="_blank" rel="noreferrer">
            <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="logo LinkedIn"/>
          </a>
          <a href={github} target="_blank" rel="noreferrer">
            <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="logo GitHub"/>
          </a>
          <a href={email} target="_blank" rel="noreferrer">
            <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="logo Email"/>
          </a>
          <a href={number_phone} target="_blank" rel="noreferrer">
            <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="logo WhatsApp"/>
          </a>
        </div>
        <Footer/>
      </div>
  )
}