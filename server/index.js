import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import postRoute from './routes/post.js'
import categoryRoute from './routes/category.js'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
const __dirname = path.resolve()
const app = express()
app.use(cors())
dotenv.config()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))
const PORT = process.env.PORT || 4000
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log('connected to mongo'))
  .catch((error) => console.log(`${error} llll`))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded')
})
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)
app.use('/api/categories', categoryRoute)

app.listen(PORT, () => {})
