import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Formation(){

  const [formations, setFormations] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/formation`)
      response = await response.json()

      setFormations(response)
    }

    fetchMyAPI()
  }, [])
      
  return (
      <div>
        <Navbar/>
        <div class='main-content'>
          {formations.map((x, i) => 
          <div class='formation'>
            <h2>{formations[i]['institution']}</h2>
            <h4>{formations[i]['formation']}</h4>
            <p key={i}>{formations[i]['period']}</p>
          </div>
          )}
        </div>
        <Footer/>
      </div>
  )
}