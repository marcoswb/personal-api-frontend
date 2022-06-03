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
          {experiences.map((x, i) => 
          <div class='experience'>
            <h2>{experiences[i]['company']}</h2>
            <h4>{experiences[i]['ocuppation']}</h4>
            <p key={i}>{experiences[i]['period']}</p>
          </div>
          )}
        </div>
        <Footer/>
      </div>
  )
}