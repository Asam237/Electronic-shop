const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
})

module.exports = mongoose.model("User", UserSchema)