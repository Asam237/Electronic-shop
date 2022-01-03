const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    picture: {
        type: String
    },
    userType: {
        type: String,
        enum: ["normal", "admin"],
        default: "normal"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("User", UserSchema)