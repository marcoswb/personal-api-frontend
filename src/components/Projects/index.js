import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { fetchProjectsData } from '../../api';

import './style.css';

export default function Projects(){
  const { t, i18n } = useTranslation();

  const [projects, setProjects] = useState([])
  const [languages, setLanguages] = useState([])

  async function loadAllProjects(){
    let response;

    if(sessionStorage.getItem('projectsData') == null){
      response = await fetchProjectsData(i18n.language)
    } else {
      response = loadDataStorage(i18n.language)
    }

    setProjects(response)
  }

  function loadDataStorage(language){
    const savedData = sessionStorage.getItem('projectsData');
    const result = savedData ? JSON.parse(savedData) : null;
    return result[language];
  }

  async function loadLanguages(){
    let response = loadDataStorage(i18n.language)

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

  async function filterLanguages(event){
    let response = loadDataStorage(i18n.language)

    let aux = []
    let language_filter = event.target.textContent.toUpperCase()
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

  useEffect(() => {
    loadAllProjects()
  }, [])
  
  useEffect(() => {
    loadLanguages()
  }, [projects]);

  useEffect(() => {
    const handleLanguageChange = (language) => {
      let result = loadDataStorage(language)
      let aux = []
      let projects_id = []

      projects.map((x, i) => {
        projects_id.push(projects[i]['id'])
      });
      
      result.map((x, i) => {
        if(projects_id.includes(result[i]['id'])){
          aux.push(result[i])
        }
      });

      setProjects(aux)
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, projects]);
      
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