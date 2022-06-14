import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

import './style.css';

export default function Blog(){

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_ENDPOINT_API}/blog`)
      response = await response.json()

      setPosts(response)
    }

    fetchMyAPI()
  }, [])
      
  return (
      <div>
        <Navbar/>
        <div class='main-content'>
          {posts.map((x, i) =>
            <a href={posts[i]["link"]} target="_blank" rel="noreferrer" class='post'>
              <h2>{posts[i]['name']}</h2>
              <h4>{posts[i]['description']}</h4>
              {/* <h4>categorias</h4>
              {posts[i]['categories'].map((r, y) =>
                <p key={y}>{posts[i]['categories'][y]}</p>
              )} */}
            </a>
          )}
        </div>
        <Footer/>
      </div>
  )
}