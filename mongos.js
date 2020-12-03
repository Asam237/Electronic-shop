const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/mySecondNew";
const options = {
    promiseLibrary: Promise,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(url, options);
mongoose.connection.on("connected", () => console.log("[ MongoDB ] is running on 5000"))
mongoose.connection.on("disconnected", () => console.log("[ MongoDB ] is not running"))