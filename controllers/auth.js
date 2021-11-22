const users = require("../models/user")
const bcryptjs = require("bcryptjs")

export const signup = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    users.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    message: "Email al ready exist !"
                })
            }
            bcryptjs.genSalt(password, 10)
                .then(hashedPassword => {
                    const user = {
                        name: name,
                        email: email,
                        password: hashedPassword
                    }

                    return user.save()
                        .then(user => res.json(user))
                        .catch(e => console.log(e))

                })
        })
}


export const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    users.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    email: "User not found"
                })
            }
            bcryptjs.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        return res.status(400).json({
                            message: "Success !"
                        })
                    } else {
                        return res.status(400).json({
                            password: "Password not valide"
                        })

                    }
                })
        })
}