import React, { useEffect, useState } from 'react'
import {
  EditOutlined as EditIcon,
  DeleteForeverOutlined as DeleteIcon,
} from '@material-ui/icons/'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import bulb from '../../assets/bulb.jpg'
import './singlePost.scss'
import { useGlobalContext } from '../../context/context'
import SinglePostText from '../singlePostText/SinglePostText'
import SinglePostHeading from '../singlePostHeading/SinglePostHeading'
const SinglePost = () => {
  const { user } = useGlobalContext()

  const [post, setPost] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)

  const location = useLocation()
  const path = location.pathname.split('/')[2]

  const handleDelete = async () => {
    try {
      await axios.delete(`/post/${post._id}`, {
        data: {
          username: user.username,
        },
      })
      window.location.replace('/')
    } catch (error) {}
  }
  const handleUpdate = async () => {
    try {
      await axios.put(`/post/${post._id}`, {
        username: user.username,
        title,
        desc,
      })
      // window.location.reload()
      setUpdateMode(false)
    } catch (error) {}
  }

  const PF = 'http://www.localhost:4000/images/'
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/post/' + path)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path])

  return (
    <section className='singlePost'>
      <SinglePostHeading
        updateMode={updateMode}
        setTitle={setTitle}
        title={title}
        post={post}
      />
      <div className={`singlePost__image ${updateMode && 'updateMode'}`}>
        <img src={PF + post.photo || bulb} alt='blogphoto' />
      </div>
      {post.username === user?.username && (
        <div className='singlePost__edit'>
          <IconButton
            onClick={() => setUpdateMode(true)}
            style={{ padding: '0', color: 'blue' }}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleDelete}
            style={{ padding: '0', marginLeft: '3px', color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <SinglePostText
        updateMode={updateMode}
        setDesc={setDesc}
        post={post}
        desc={desc}
        handleUpdate={handleUpdate}
      />
    </section>
  )
}

export default SinglePost
