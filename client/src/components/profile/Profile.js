import React, { useState, useEffect } from 'react'
import './profile.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import sun from '../../assets/sun.jpg'
import { Facebook, Twitter, Instagram, Pinterest } from '@material-ui/icons'
const Profile = () => {
  const [categs, setCategs] = useState([])

  useEffect(() => {
    const getCateg = async () => {
      const res = await axios.get('/categories')
      setCategs(res.data)
    }
    getCateg()
  }, [])
  return (
    <section className='profile'>
      <article className='profile__card'>
        <div className='profile__card__header underlined'>
          <h4>ABOUT ME</h4>
        </div>
        <figure className='profile__card__image'>
          <img src={sun} alt='' />
        </figure>
        <div className='profile__card__about'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          suscipit perspiciatis nisi, eius minus quaerat!
        </div>
        <div className='profile__card__categories'>
          <div className='profile__card__categories__header underlined'>
            <h4>CATEGORIES</h4>
          </div>
          <div className='profile__card__categories__lists'>
            <ul>
              {categs.map((categ) => (
                <Link to={`/?categ=${categ.name}`}>
                  <li>{categ.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className='profile__card__socials'>
          <div className='profile__card__socials_header underlined'>
            <h4>FOLLOW US</h4>
          </div>
          <div className='profile__card__socials__icons'>
            <Facebook />
            <Instagram />
            <Pinterest />
            <Twitter />
          </div>
        </div>
      </article>
    </section>
  )
}

export default Profile
