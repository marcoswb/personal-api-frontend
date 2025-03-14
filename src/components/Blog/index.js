import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Blog(){
  const { t } = useTranslation();

  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])

  async function loadCategories(){
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/blog`)
    response = await response.json()

    let aux = []
    for(var index in response){
      for(var index_category in response[index]['categories']){
        let category = String(response[index]['categories'][index_category]).toUpperCase()
        if(!aux.includes(category)){
          aux.push(category)
        }
      }
    }
    
    setCategories(aux)
  }

  async function loadAllPosts(){
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/blog`)
    response = await response.json()

    setPosts(response)
  }
  
  useEffect(() => {
    loadAllPosts()
    loadCategories()
  }, [])

  async function filterPosts(event){
    let category_filter = event.target.textContent.toUpperCase()
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/blog`)
    response = await response.json()

    let aux = []
    for(var index in response){
      for(var index_category in response[index]['categories']){
        let category = String(response[index]['categories'][index_category]).toUpperCase()
        if(category_filter === category){
          aux.push(response[index])
        }
      }
    }
    
    setPosts(aux)
  }
      
  return (
      <div>
        <Navbar/>
        <div id="content-list" class="main-content">
          <div id="blog-posts">
            {posts.map((x, i) =>
              <a href={posts[i]["link"]} target="_blank" rel="noreferrer" class='post'>
                <h2>{posts[i]['name']}</h2>
                <h4>{posts[i]['description']}</h4>
              </a>
            )}
          </div>
          <div id="blog-techs">
            <h3 onClick={loadAllPosts}>{t('blog_topics')}</h3>
            <ol>
              {categories.map((x, i) =>
                <li onClick={filterPosts}>{categories[i]}</li>
              )}
            </ol>
          </div>
        </div>
        <Footer/>
      </div>
  )
}