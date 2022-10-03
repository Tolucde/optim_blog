import React, { useState, useEffect } from 'react'
import HomeNews from '../homeNews/HomeNews'
import Profile from '../profile/Profile'
import axios from 'axios'
import './home.scss'
import { useLocation } from 'react-router-dom'
const Home = () => {
  const [posts, setPosts] = useState([])
  const { search } = useLocation()
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/post' + search)
      setPosts(res.data)
    }
    fetchPosts()
  }, [search])
  console.log(posts)
  return (
    <div className='home'>
      <HomeNews posts={posts} className='home__homeNews' />
      <Profile className='home__profile' />
    </div>
  )
}

export default Home
