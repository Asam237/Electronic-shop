const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000
const AuthRoutes = require("./routes/auth")
const mongoose = require("mongoose")
const url = "mongodb://localhost:27017/MyTest";
const passport = require("passport")

const options = {
    promiseLibrary: Promise,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(url, options);
mongoose.connection.on("connected", () => console.log("[MongoDB] is running on 5000"))
mongoose.connection.on("disconnected", () => console.log("[MongoDB] is not running"))

app.use(passport.initialize())
require("./config/passport")(passport)
app.get("/", (req, res) => res.send("Hello !"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(AuthRoutes)
app.listen(PORT, () => console.log(`[Express JS] is running on ${PORT}`))