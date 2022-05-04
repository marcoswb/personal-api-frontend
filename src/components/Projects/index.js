import React, { useState, useEffect } from 'react'

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
        <h3>projects:</h3>
        {projects.map((x, i) =>
          <>
            <p key={i}>{projects[i]['name']}: {projects[i]['description']}: {projects[i]['link']}</p>
            <h4>linguagens</h4>
            {projects[i]['languages'].map((r, y) =>
              <p key={y}>{projects[i]['languages'][y]}</p>
            )}
          </>
        )}
      </div>
  )
}