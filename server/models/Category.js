import mongoose from 'mongoose'

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Categories = mongoose.model('Categories', CategoriesSchema)

export default Categories