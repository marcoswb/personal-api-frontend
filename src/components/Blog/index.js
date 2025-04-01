import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { fetchBlogData } from '../../api';

import './style.css';

export default function Blog(){
  const { t, i18n } = useTranslation();

  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])

  async function loadAllPosts(){
    let response;

    if(sessionStorage.getItem('blogData') == null){
      response = await fetchBlogData(i18n.language)
    } else {
      response = loadDataStorage(i18n.language)
    }
    
    setPosts(response)
  }

  function loadDataStorage(language){
    const savedData = sessionStorage.getItem('blogData');
    const result = savedData ? JSON.parse(savedData) : null;
    return result[language];
  }

  async function loadCategories(){
    let response = loadDataStorage(i18n.language)

    let aux = []
    response.map((x, i) => {
      response[i]['categories'].map((y, r) => {
        let category = String(response[i]['categories'][r]).toUpperCase()
        if(!aux.includes(category)){
          aux.push(category)
        }
      })
    })
    
    setCategories(aux)
  }

  async function filterPosts(event){
    let response = loadDataStorage(i18n.language)

    let aux = []
    let category_filter = event.target.textContent.toUpperCase()
    response.map((x, i) => {
      response[i]['categories'].map((y, r) => {
        let category = String(response[i]['categories'][r]).toUpperCase()
        if(category_filter === category){
          aux.push(response[i])
        }
      })
    })
    
    setPosts(aux)
  }
  
  useEffect(() => {
    loadAllPosts()
  }, []);

  useEffect(() => {
    loadCategories()
  }, [posts]);

  useEffect(() => {
    const handleLanguageChange = (language) => {
      let result = loadDataStorage(language)
      let aux = []
      let posts_id = []

      posts.map((x, i) => {
        posts_id.push(posts[i]['id'])
      });
      
      result.map((x, i) => {
        if(posts_id.includes(result[i]['id'])){
          aux.push(result[i])
        }
      });

      setPosts(aux)
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, posts]);
      
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