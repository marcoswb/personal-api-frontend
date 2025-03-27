import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import $ from 'jquery'

import './style.css';

export default function Footer(){
  const { t } = useTranslation();

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
                <a href="/">{t('home')}</a>
            </li>
            <li>
                <a href="/experience">{t('experience')}</a>
            </li>
            <li>
                <a href="/formation">{t('formation')}</a>
            </li>
            <li>
                <a href="/projects">{t('projects')}</a>
            </li>
            <li>
                <a href="/blog">{t('blog')}</a>
            </li>
            <li>
                <a href="/contacts">{t('Contacts')}</a>
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