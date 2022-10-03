import express from 'express'
const router = express.Router()

import { createUser, login } from '../controllers/auth.js'

router.post('/register', createUser)
router.post('/login', login)

export default router