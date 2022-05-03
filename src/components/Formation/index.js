import React, { useState, useEffect } from 'react'

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
        <h3>formations:</h3>
        {formations.map((x, i) => 
          <p key={i}>{formations[i]['formation']}: {formations[i]['institution']}: {formations[i]['period']}</p>
        )}
      </div>
  )
}