const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require("body-parser")
const users = require("./routes/api/users");
const passport = require("passport");

app.use(passport.initialize())
require("./config/passport")(passport)
app.use(bodyParser.json())
app.use("/api/users", users)

app.listen(port, () => console.log(`[ ExpressJS ] is running on ${port}`))