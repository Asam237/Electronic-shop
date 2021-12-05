const Category = require("../models/Category")
const routes = require("express").Router()
const { verifyTokenAndAdmin } = require("./verifyToken")

routes.post("/", verifyTokenAndAdmin, async (req, res) => {
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