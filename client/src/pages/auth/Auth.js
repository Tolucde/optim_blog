import React, { useState } from 'react'
import './auth.scss'
import axios from 'axios'
import { Button } from '@material-ui/core'
import {
  Person,
  EmailOutlined as EmailIcon,
  VpnKey as PasswordIcon,
} from '@material-ui/icons'
import { useHistory } from 'react-router'
import { useGlobalContext } from '../../context/context'
const Auth = () => {
  const history = useHistory()
  const { user, dispatch, isFetching } = useGlobalContext()

  const [isAccount, setIsAccount] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isFormEntered, setIsFormEntered] = useState(true)
  const [enteredError, setEnteredError] = useState('')

  const isFieldEmpty = username.trim() === '' || password.trim() === ''

  const handleBlur = (e) => {
    setIsFormEntered(true)
    let fieldLabel = e.target.parentElement.children[0].textContent
    if (e.target.value.trim() === '') {
      setEnteredError(`${fieldLabel} must be entered`)
    } else {
      setEnteredError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isFieldEmpty) {
      setEnteredError('')
      setIsFormEntered(false)
      return
    }
    if (isAccount) {
      dispatch({ type: 'LOGIN_START' })
      try {
        const res = await axios.post('/auth/login', {
          username,
          password,
        })
        console.log(res.data)
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
        history.push('/')
      } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE' })
      }
    } else {
      setError(false)
      if (password !== confirmPassword) return alert('passwords dont match ')
      try {
        await axios.post('/auth/register', {
          username,
          email,
          password,
        })
      } catch (error) {
        setError(true)
        setErrorMessage(error.response.data.message)
      }
    }
  }
  return (
    <div className='auth'>
      <div className='auth__header'>
        <h1>{isAccount ? 'Login' : 'Register'}</h1>
      </div>
      <form className='auth__form' onSubmit={handleSubmit}>
        <div className='auth__form__group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            placeholder='Enter your username...'
            autoFocus={true}
            onBlur={handleBlur}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Person className='personIcon icon' />
        </div>
        {isAccount ? null : (
          <div className='auth__form__group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email...'
              autoFocus={true}
              onBlur={handleBlur}
              onChange={(e) => setEmail(e.target.value)}
            />
            <EmailIcon className='emailIcon icon' />
          </div>
        )}

        <div className='auth__form__group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter your password...'
            onBlur={handleBlur}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordIcon className='passwordIcon icon' />
        </div>
        {isAccount ? null : (
          <div className='auth__form__group'>
            <label htmlFor='confirm'>Confirm Password</label>
            <input
              type='password'
              id='confirm'
              placeholder='Confirm Password...'
              onBlur={handleBlur}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordIcon className='passwordIcon icon' />
          </div>
        )}
        <Button
          type='submit'
          size='large'
          color={isAccount ? 'primary' : 'secondary'}
          className='auth__form__registerBtn'
          variant='contained'>
          {isAccount ? 'LOGIN' : 'REGISTER'}
        </Button>
      </form>
      <span
        style={{
          color: 'red',
          padding: '5px',
          fontWeight: 'bold',
          fontSize: '12px',
          borderRadius: '5px',
          marginTop: '8px',
        }}>
        {error && errorMessage}
        {!isFormEntered && 'All fields must be entered'}
        {enteredError}
      </span>
      <div className='auth__switch'>
        <h3>
          {isAccount ? "don't have an account?" : 'already have an account?'}
        </h3>
        <Button
          onClick={() => setIsAccount(!isAccount)}
          variant='contained'
          color={isAccount ? 'secondary' : 'primary'}>
          {isAccount ? 'REGISTER' : 'LOGIN'}
        </Button>
      </div>
    </div>
  )
}

export default Auth
