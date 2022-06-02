import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Experience(){

  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/experience`)
      response = await response.json()

      setExperiences(response)
    }

    fetchMyAPI()
  }, [])
      
  return (
      <div>
        <Navbar/>
        <div class='main-content'>
          <h3>experiences:</h3>
          {experiences.map((x, i) => 
            <p key={i}>{experiences[i]['company']}: {experiences[i]['ocuppation']}: {experiences[i]['period']}</p>
          )}
        </div>
        <Footer/>
      </div>
  )
}