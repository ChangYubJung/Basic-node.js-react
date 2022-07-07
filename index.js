const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://jwdo3015:wjdckdduq149!%40@boilerplate.unkzso9.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log("MongoDB Connected....")).catch(err=>console.log(err))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})