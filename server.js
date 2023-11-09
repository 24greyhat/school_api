
// to gain access of the environmental variables in the .env file
require('dotenv').config()

// requiring express and mongoose
const express = require("express")
const app = express()
const mongoose = require('mongoose')

// connecting to db
mongoose.connect(process.env.DB_URL)

const db = mongoose.connection

// on error print error
db.on("error", (error)=> console.error(error))

// on connection print db connected 
db.once('open', ()=>console.log("Database Connected!"))


app.use(express.json())

const managementRouter = require("./routes/management")
app.use("/management", managementRouter)



app.listen(3000, ()=> console.log("Api running on: http://127.0.0.1:3000/"))
