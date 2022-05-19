import React, { useState, useEffect } from 'react'
import $ from 'jquery'

import './style.css';

export default function NavBar(){

  const [full_name, setFullName] = useState('')

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(process.env.REACT_APP_ENDPOINT_API)
      response = await response.json()

      setFullName(response['full_name'])
    }

    fetchMyAPI()
  }, [])

  function handleClickToggleMenu(){
    $(this).toggleClass('active');
    $('#navbar').slideToggle();
  }

  return (
    <nav>
        <h1>
            <a id='link_root_path' href="/">{full_name}</a>
        </h1>
        <ul id="navbar">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/experience">Experiência</a>
            </li>
            <li>
                <a href="/formation">Formação</a>
            </li>
            <li>
                <a href="/projects">Projetos</a>
            </li>
            <li>
                <a href="/blog">Blog</a>
            </li>
            <li>
                <a href="/contacts">Contatos</a>
            </li>
        </ul>
        <div className="nav__icon" onClick={handleClickToggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
  )
}