const Product = require("../models/Product")
const route = require("express").Router()
const { verifyTokenAndAdmin } = require("./verifyToken")

route.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
})

module.exports = route