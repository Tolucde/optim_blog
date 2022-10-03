import express from 'express'
const router = express.Router()
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from '../controllers/post.js'

router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.get('/:id', getPost)
router.get('/', getAllPosts)

export default router
