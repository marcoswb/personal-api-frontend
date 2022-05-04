import React, { useState, useEffect } from 'react'

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
        <h3>posts:</h3>
        {posts.map((x, i) =>
          <>
            <p key={i}>{posts[i]['name']}: {posts[i]['description']}: {posts[i]['link']}</p>
            <h4>categorias</h4>
            {posts[i]['categories'].map((r, y) =>
              <p key={y}>{posts[i]['categories'][y]}</p>
            )}
          </>
        )}
      </div>
  )
}