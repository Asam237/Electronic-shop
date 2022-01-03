const Category = require("../models/category")
const router = require("express").Router()
const { verifyTokenAndAdmin } = require("./verifyToken")

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateCategory)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json("delete category")
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = routes