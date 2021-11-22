const express = require("express")
const routers = express.Router()
const auth = require("../controllers/auth")

routers.post("/login", auth.login)
routers.post("/signup", auth.signup)

module.exports = routers