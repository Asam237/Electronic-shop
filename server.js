const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000
const users = require("./routes/api/users")
const profil = require("./routes/api/profiles")
const passport = require("passport");
require("./config/passport")(passport)


app.use(bodyParser.json())
app.use(passport.initialize())
app.use("/api/users", users)
app.use("/api/profile", profil)

app.listen(port, () => console.log(`[ExpressJS] is running on ${port}`))