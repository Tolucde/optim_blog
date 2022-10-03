import React from 'react'
import './singlePostText.scss'
import { Button } from '@material-ui/core'

const SinglePostText = ({ updateMode, setDesc, post, desc, handleUpdate }) => {
  return (
    <>
      {updateMode ? (
        <div className='singlePost__text__edit'>
          <textarea
            type='text'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button
            onClick={handleUpdate}
            className='updatePostBtn'
            variant='contained'
            color='primary'>
            UPDATE
          </Button>
        </div>
      ) : (
        <p className='singlePost__text'>{desc}</p>
      )}
    </>
  )
}

export default SinglePostText
