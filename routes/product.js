const Product = require("../models/product")
const router = require("express").Router()
const { verifyTokenAndAdmin } = require("./verifyToken")

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    })
    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateProduct)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.delete(":/id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("delete product")
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router