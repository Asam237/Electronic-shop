const express = require("express");
const router = express.Router();
const Profil = require("../../models/Profil")
const User = require("../../models/User")
const passport = require("passport")


router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const errors = {}
    Profil.findOne({ user: req.user.id }).then(profile => {
        if (!profile) {
            errors.noprofile = "no profile found"
            return res.status(404).json({ errors })
        }
        res.json(profile)
    }).catch(e => console.log(e))
})

module.exports = router;