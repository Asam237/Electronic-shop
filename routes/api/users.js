const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const k = require("../../config/keys");
const passport = require("passport");


router.post("/registration", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ message: "User al ready exist" })
        } else {

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(e => console.log(e))
                })
            })

        }
    })
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: "Not found" })
        }
        bcryptjs.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, name: user.name, email: user.email }
                jwt.sign(
                    payload,
                    k.secretOrKey, { expiresIn: 8 * 3600 },
                    (err, token) => {
                        return res.json({
                            success: true,
                            token: "jwt " + token,
                            user: {
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )

            } else {
                return res.json({ message: "Password not valid" })
            }
        })
    })

})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    return res.json(req.user)
})

module.exports = router;