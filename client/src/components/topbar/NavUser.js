import React from 'react'
import { SearchOutlined, Twitter, Instagram } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Avatar, Button, IconButton } from '@material-ui/core'
import './navUser.scss'
const NavUser = ({ user }) => {
  return (
    <div className='header__nav__user'>
      {user ? (
        <>
          <Link to='/settings'>
            <IconButton>
              <Avatar src={user.profilePic}>{user.username}</Avatar>
            </IconButton>
          </Link>
          <IconButton>
            <Twitter />
          </IconButton>
          <IconButton>
            <Instagram />
          </IconButton>
        </>
      ) : (
        <Link to='/auth'>
          <Button
            style={{ marginRight: '6px' }}
            size='small'
            variant='contained'
            color='primary'>
            LOGIN
          </Button>
        </Link>
      )}
      <IconButton>
        <SearchOutlined />
      </IconButton>
    </div>
  )
}

export default NavUser
