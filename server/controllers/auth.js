import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const createUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingUser =
      (await User.findOne({ email })) || (await User.findOne({ email }))
    if (existingUser)
      return res.status(409).json({
        message: ' user already exists',
      })
    // if (password !== confirmPassword)
    //   return res.status(404).json({ message: 'passwords do not match' })
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    res.status(201).json(newUser)
    // const user = await newUser.save()
  } catch (error) {
    res.status(500).json(error.message)
  }
}
export const login = async (req, res) => {
  // const { username, email, password, confirmPassword } = req.body

  try {
    const user = await User.findOne({ username: req.body.username })

    !user && res.status(400).json({ message: 'user does not exist' })

    const validated = await bcrypt.compare(req.body.password, user.password)

    !validated && res.status(400).json({ message: 'wrong credentials' })

    const { password, ...others } = user._doc
    res.status(200).json(others)
    // const user = await newUser.save()
  } catch (error) {
    res.status(500).json(error.message)
  }
}
