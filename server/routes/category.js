import express from 'express'
const router = express.Router()

import { createCategory, getCategories } from '../controllers/categories.js'

router.post('/', createCategory)
router.get('/', getCategories)

// router.post('/login', login)

export default router