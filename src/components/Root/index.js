import React, { useState, useEffect } from 'react'

import './style.css';

export default function Root(){

  const [full_name, setFullName] = useState('')
  const [name, setName] = useState('')
  const [occupation, setOccupation] = useState('')
  const [number_phone, setNumberPhone] = useState('')
  const [about, setAbout] = useState('')
  const [skills, setSkills] = useState([])
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(process.env.REACT_APP_ENDPOINT_API)
      response = await response.json()

      setFullName(response['full_name'])
      setName(response['name'])
      setOccupation(response['occupation'])
      setNumberPhone(response['number_phone'])
      setAbout(response['about'])
      setSkills(response['skills'])
      setLinkedin(response['linkedin_link'])
      setGithub(response['github_link'])
      setEmail(response['email'])
    }

    fetchMyAPI()
  }, [])
      
  return (
      <div>
        <h3>full_name:</h3>
        <p>{full_name}</p>
        <h3>name:</h3>
        <p>{name}</p>
        <h3>occupation:</h3>
        <p>{occupation}</p>
        <h3>number_phone:</h3>
        <p>{number_phone}</p>
        <h3>about:</h3>
        <p>{about}</p>
        <h3>skills:</h3>
        {skills.map((x, i) => 
          <p key={i}>{skills[i]['name']}: {skills[i]['link_icon']}</p>
        )}
        <h3>linkedin:</h3>
        <p>{linkedin}</p>
        <h3>github:</h3>
        <p>{github}</p>
        <h3>email:</h3>
        <p>{email}</p>
      </div>
  )
}