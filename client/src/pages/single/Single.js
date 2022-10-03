import React from 'react'
import Profile from '../../components/profile/Profile'
import SinglePost from '../../components/singlePost/SinglePost'
import './single.scss'
const Single = () => {
  return (
    <div className='single'>
      <SinglePost />
      <Profile />
    </div>
  )
}

export default Single
