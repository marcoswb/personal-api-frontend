import React, { useState, useEffect } from 'react'

import './style.css';

export default function Footer(){

  const [full_name, setFullName] = useState('')

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(process.env.REACT_APP_ENDPOINT_API)
      response = await response.json()

      setFullName(response['full_name'])
    }

    fetchMyAPI()
  }, [])


  return (
    <footer>
      <div class="footer-content">
        <ul class="socials">
          <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
          <li><a href="#"><i class="fa fa-github"></i></a></li>
          <li><a href="#"><i class="fa fa-envelope"></i></a></li>
          <li><a href="#"><i class="fa fa-whatsapp"></i></a></li>
        </ul>
      </div>
    </footer>
  )
}