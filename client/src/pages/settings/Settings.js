import React, { useState, useEffect } from 'react'
import Profile from '../../components/profile/Profile'
import './settings.scss'
import { Avatar, Button, IconButton } from '@material-ui/core'
import AddPic from '@material-ui/icons/AddAPhotoOutlined'
import { useGlobalContext } from '../../context/context'
import axios from 'axios'
const Settings = () => {
  const { user, dispatch } = useGlobalContext()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'UPDATE_START' })
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name', filename)
      data.append('file', file)
      updatedUser.profilePic = filename
      try {
        await axios.post('/upload', data)
      } catch (error) {}
    }
    try {
      const res = await axios.put('/user/' + user._id, updatedUser)
      setSuccess(true)
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data })
    } catch (error) {
      dispatch({ type: 'UPDATE_FAILURE' })
    }
  }
  return (
    <div className='settings'>
      <div className='settings__wrapper'>
        <div className='settings__wrapper__actions'>
          <span>Update Account</span> <span>Delete Account</span>
        </div>
        <form className='settings__wrapper__form' onSubmit={handleSubmit}>
          <div className='settings__wrapper__form__profile'>
            <label>Profile Picture</label>
            <div className='settings__wrapper__form__profile__pic'>
              <Avatar
                className='profileAvatar'
                src={file ? URL.createObjectURL(file) : user.profilePic}
                alt={user.username}>
                {user.username}
              </Avatar>
              <label htmlFor='fileInput'>
                <AddPic style={{ color: 'blue', cursor: 'pointer' }} />
              </label>
              <input
                type='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={(e) => setFile.target.files[0]}
              />
            </div>
          </div>
          <div className='settings__wrapper__form__group'>
            <label htmlFor='username'>Username </label>
            <input
              type='text'
              autoFocus={true}
              id='username'
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='settings__wrapper__form__group'>
            <label htmlFor='email'>Email </label>
            <input
              type='text'
              id='email'
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='settings__wrapper__form__group'>
            <label htmlFor='password'>Password </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='settings__wrapper__form__updateBtn'>
            UPDATE
          </Button>
          {success && (
            <span style={{ color: 'green' }}>Profile has been updated...</span>
          )}
        </form>
      </div>
      <Profile />
    </div>
  )
}

export default Settings
