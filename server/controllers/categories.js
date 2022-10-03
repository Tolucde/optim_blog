import Categories from '../models/Category.js'

export const createCategory = async(req, res) => {
    const newCateg = new Categories(req.body)

    try {
        const savedCateg = await newCateg.save()
        res.status(200).json(savedCateg)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getCategories = async(req, res) => {
    try {
        const categs = await Categories.find()
        res.status(200).json(categs)
    } catch (error) {
        res.status(500).json(error.message)
    }
}