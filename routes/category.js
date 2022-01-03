const Category = require("../models/category")
const routes = require("express").Router()
const { verifyToken } = require("./verifyToken")

routes.post("/", verifyToken, async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
})

module.exports = routes