import React, { useState, useEffect } from 'react'
import $ from 'jquery'

import './style.css';

export default function Root(){

  const [full_name, setFullName] = useState('')
  const [name, setName] = useState('')
  const [occupation, setOccupation] = useState('')
  const [number_phone, setNumberPhone] = useState('')
  const [about, setAbout] = useState('')
  const [skills, setSkills] = useState([])
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(process.env.REACT_APP_ENDPOINT_API)
      response = await response.json()

      setFullName(response['full_name'])
      setName(response['name'])
      setOccupation(response['occupation'])
      setNumberPhone(response['number_phone'])
      setAbout(response['about'])
      setSkills(response['skills'])
      setLinkedin(response['linkedin_link'])
      setGithub(response['github_link'])
      setEmail(response['email'])
    }

    fetchMyAPI()
  }, [])

  function handleClickToggleMenu(){
    $(this).toggleClass('active');
    $('#navbar').slideToggle();
  }

  return (
      <div>
        <nav>
            <h1>
                <a id='link_root_path' href="/">{full_name}</a>
            </h1>
            <ul id="navbar">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/experience">Experiência</a>
                </li>
                <li>
                    <a href="/formation">Formação</a>
                </li>
                <li>
                    <a href="/projects">Projetos</a>
                </li>
                <li>
                    <a href="/blog">Blog</a>
                </li>
                <li>
                    <a href="/contacts">Contatos</a>
                </li>
            </ul>
            <div className="nav__icon" onClick={handleClickToggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
        <div class='main-content'>
          <div>
            <p>Olá eu sou {name},</p>
            <p>{occupation}</p>

            <h4>Vamos conversar? {number_phone}</h4>
          </div>
          <div>
            <p>{about}</p>
          </div>
          <div>
            <div>
              <h3>skills:</h3>
              {skills.map((x, i) => 
                <p key={i}>{skills[i]['name']}: {skills[i]['link_icon']}</p>
              )}
            </div>
            <div>
              <h3>linkedin:</h3>
              <p>{linkedin}</p>
              <h3>github:</h3>
              <p>{github}</p>
              <h3>email:</h3>
              <p>{email}</p>
            </div>
          </div>
          
        </div>
      </div>
  )
}