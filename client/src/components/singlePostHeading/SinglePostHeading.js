import React from 'react'
import './singlePostHeading.scss'
import { Link } from '@material-ui/core'

const SinglePostHeading = ({ updateMode, setTitle, title, post }) => {
  return (
    <article className='singlePost__header'>
      <div className='singlePost__header__title'>
        {updateMode ? (
          <input
            type='text'
            value={title}
            className='singlePost__header__title__input'
            autofocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1>{title}</h1>
        )}
      </div>
      <div className='singlePost__header__authorDate'>
        <Link to={`/?user=${post.username}`}>
          <p> By {post.author}</p>
        </Link>
        <p>{new Date(post.createdAt).toDateString()}</p>
      </div>
    </article>
  )
}

export default SinglePostHeading
