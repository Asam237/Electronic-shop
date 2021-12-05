const User = require("../models/User")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const router = require("express").Router()


router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        )
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).jsonp(savedUser)
    } catch (e) {
        console.log("Error", e)
        res.status(500).json(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );
        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const inputPassword = req.body.password;

        originalPassword != inputPassword &&
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        res.status(500).json(err);
    }

});


module.exports = router