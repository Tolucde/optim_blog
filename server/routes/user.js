import express from 'express'
const router = express.Router()

import { updateUser, deleteUser, getUser } from '../controllers/user.js'

//update user
router.put('/:id', updateUser)

//delete user
router.delete('/:id', deleteUser)

router.get('/:id', getUser)

export default router