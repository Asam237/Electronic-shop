const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = require("express").Router()

router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        isAdmin: true
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).jsonp(savedUser)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/login', async (req, res) => {
    const secret = process.env.SECRET
    try {
        const user = await User({
            email: req.body.email
        })
        if (!user) {
            res.status(401).json("The user not found !")
        }
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                { expiresIn: "3d" }
            )
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                picture: user.picture,
                token: token

            })
        }
    } catch (e) {
        res.status(500).json(e)
    }
});


module.exports = router