import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/AddOutlined'
import { Button, IconButton } from '@material-ui/core'
import bulb from '../../assets/bulb.jpg'
import './write.scss'
import axios from 'axios'
import { useGlobalContext } from '../../context/context'
const Write = () => {
  const { user } = useGlobalContext()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [author, setAuthor] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      title,
      desc,
      author: user.username,
      username: user.username,
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name', filename)
      data.append('file', file)
      newPost.photo = filename
      try {
        await axios.post('/upload', data)
      } catch (error) {}
    }
    try {
      const res = await axios.post('/post/', newPost)
      window.location.replace('/post/' + res.data._id)
    } catch (error) {
      console.log(error.response.data)
    }
    console.log(newPost)
  }

  return (
    <div>
      <div className='write'>
        <img
          className='write__image'
          src={file ? URL.createObjectURL(file) : bulb}
          alt='articleImage'
        />
        <form className='write__form' onSubmit={handleSubmit}>
          <div className='write__form__group'>
            <label htmlFor='fileInput'>
              <AddIcon className='write__form__group__addIcon' />
            </label>
            <input
              type='file'
              id='fileInput'
              className='write__form__group__filePic'
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <input
              type='text'
              placeholder='Title of your post'
              className='write__form__group__input'
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='write__form__group'>
            <textarea
              placeholder='Share your post with us. . .'
              className='write__form__group__textArea'
              type='text'
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <Button
            type='submit'
            className='write__form__publishBtn'
            variant='contained'
            size='small'
            color='primary'>
            Publish
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Write
