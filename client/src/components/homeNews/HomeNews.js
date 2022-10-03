import React from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@material-ui/core'
import sun from '../../assets/sun.jpg'
// import bulb from '../../assets/bulb.jpg'
import './homeNews.scss'

const HomeNews = ({ posts }) => {
  const PF = 'http://www.localhost:4000/images/'
  return (
    <section className='homeNews'>
      <Grid container className='homeNewsGrid'>
        {posts.map((post) => (
          <Grid
            className='homeNews__card'
            item
            component={Card}
            xs={12}
            sm={6}
            md={5}>
            <CardMedia
              className='homeNews__card__media'
              image={post.photo ? PF + post.photo : sun}
              title='sun'
            />
            <CardContent className='homeNews__cardContent'>
              {post.categories.map((categ) => (
                <Typography
                  gutterBottom
                  variant='caption'
                  Color='textSecondary'>
                  {categ.name}
                </Typography>
              ))}
              <Link to={`/post/${post._id}`}>
                <Typography gutterBottom variant='h6' Color='primary'>
                  {post.title}
                </Typography>
              </Link>
              <Typography gutterBottom variant='caption' Color='textSecondary'>
                {new Date(post.createdAt).toDateString()}
              </Typography>
              <Typography
                gutterBottom
                className='homeNews__card__text'
                variant='body2'
                Color='textSecondary'>
                {post.desc.slice(0, 350)}
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default HomeNews
