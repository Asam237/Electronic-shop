const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const k = require("../../config/keys")
const passport = require("passport")

router.post("/registration", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ message: "User al ready exist" })
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(e => console.log(e))
                })
            })


        }
    })
})

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: "Not found" })
        }
        bcryptjs.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user._id, name: user.name }
                jwt.sign(
                        payload,
                        k.secretOrKey, { expiresIn: 36000 },
                        (err, token) => {
                            return res.json({
                                success: true,
                                token: 'Asam237' + token
                            })
                        }

                    )
                    // return res.json({ message: "Success" })
            } else {
                return res.json({ message: "Failed" })
            }
        })
    })

})

router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        // id: req.body.id,
        name: req.body.name,
        password: req.body.password
    })
})
module.exports = router;