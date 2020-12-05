const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfilSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    }
})

const Profil = mongoose.model("Profil", ProfilSchema)
module.exports = Profil;