import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Projects(){

  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/projects`)
      response = await response.json()

      setProjects(response)
    }

    fetchMyAPI()
  }, [])
      
  return (
      <div>
        <Navbar/>
        <div class='main-content'>
        {projects.map((x, i) =>
            <a href={projects[i]["link"]} target="_blank" rel="noreferrer" class='project'>
              <h2>{projects[i]['name']}</h2>
              <h4>{projects[i]['description']}</h4>
              {/* <h4>categorias</h4>
              {projects[i]['categories'].map((r, y) =>
                <p key={y}>{projects[i]['categories'][y]}</p>
              )} */}
            </a>
          )}
        </div>
        <Footer/>
      </div>
  )
}