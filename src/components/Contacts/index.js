import React, { useState, useEffect } from 'react'

import './style.css';

export default function Contacts(){

  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [email, setEmail] = useState('')
  const [number_phone, setNumberPhone] = useState('')

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/contacts`)
      response = await response.json()

      setLinkedin(response['linkedin_link'])
      setGithub(response['github_link'])
      setEmail(response['email'])
      setNumberPhone(response['number_phone'])
    }

    fetchMyAPI()
  }, [])
      
  return (
      <div>
        <h3>linkedin:</h3>
        <p>{linkedin}</p>
        <h3>github:</h3>
        <p>{github}</p>
        <h3>email:</h3>
        <p>{email}</p>
        <h3>number_phone:</h3>
        <p>{number_phone}</p>
      </div>
  )
}