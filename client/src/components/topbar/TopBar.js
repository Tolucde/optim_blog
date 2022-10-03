import React from 'react'
import './topbar.scss'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { useGlobalContext } from '../../context/context'
import { navLists } from '../../data'
import NavUser from './NavUser'
const TopBar = () => {
  const { user, dispatch } = useGlobalContext()
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <header className='header'>
      <div className='header__logo'>OptimBlog</div>
      <nav className='header__nav'>
        {navLists.map((navList) => (
          <div className='header__nav__item'>
            <Link to={navList.link}>{navList.name}</Link>
          </div>
        ))}
        <Link to='/auth'>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleLogout}
            className='header__nav__item'>
            {user && 'Logout'}
          </Button>
        </Link>
      </nav>
      <NavUser user={user} />
    </header>
  )
}

export default TopBar
