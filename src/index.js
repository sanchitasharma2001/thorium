const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")

const route = require("./route/route")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(multer().any())

mongoose.connect("mongodb+srv://group13:UEEqzwKeluhyT2uM@cluster0.hkvjs.mongodb.net/group20Database?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('mongodb running on 3000'))
    .catch(err => console.log(err))

app.use("/", route)

app.listen(3000, () => {
    console.log('Express app running on port 3000')
})
