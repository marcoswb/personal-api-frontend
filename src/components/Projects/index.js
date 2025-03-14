import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Projects(){
  const { t } = useTranslation();

  const [projects, setProjects] = useState([])
  const [languages, setLanguages] = useState([])

  async function loadLanguages(){
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/projects`)
    response = await response.json()

    let aux = []
    for(var index in response){
      for(var index_language in response[index]['languages']){
        let language = String(response[index]['languages'][index_language]).toUpperCase()
        if(!aux.includes(language) && language !== ''){
          aux.push(language)
        }
      }
    }
    
    setLanguages(aux)
  }

  async function loadAllProjects(){
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/projects`)
    response = await response.json()

    setProjects(response)
  }
  
  useEffect(() => {
    loadAllProjects()
    loadLanguages()
  }, [])

  async function filterLanguages(event){
    let language_filter = event.target.textContent.toUpperCase()
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/projects`)
    response = await response.json()

    let aux = []
    for(var index in response){
      for(var index_language in response[index]['languages']){
        let language = String(response[index]['languages'][index_language]).toUpperCase()
        if(language_filter === language){
          aux.push(response[index])
        }
      }
    }
    
    setProjects(aux)
  }
      
  return (
      <div>
        <Navbar/>
        <div id="content-list" class="main-content">
          <div id="projects">
            {projects.map((x, i) =>
              <a href={projects[i]["link"]} target="_blank" rel="noreferrer" class='project'>
                <h2>{projects[i]['name']}</h2>
                <h4>{projects[i]['description']}</h4>
              </a>
            )}
          </div>
          <div id="project-languages">
            <h3 onClick={loadAllProjects}>{t('languages_tools')}</h3>
            <ol>
              {languages.map((x, i) =>
                <li onClick={filterLanguages}>{languages[i]}</li>
              )}
            </ol>
          </div>
        </div>
        <Footer/>
      </div>
  )
}