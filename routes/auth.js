const express = require("express")
const routers = express.Router()
const auth = require("../controllers/auth")

routers.post("/login", auth.postLogin)
routers.post("/signup", auth.postSignup)

module.exports = routers