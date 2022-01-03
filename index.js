const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const categoriesRoute = require("./routes/category")
const productsRoute = require("./routes/product")
const multer = require("./midleware/multer-config")

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("[ Database ] : connection successfull"))
    .catch(e => console.log(e))

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/api/auth", authRoute)
app.use("/api/categories", categoriesRoute)
app.use("/api/products", productsRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("[ BackEnd ] : is running !")
})