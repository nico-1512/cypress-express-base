const express = require('express');
const md5 = require('md5');

const app = express()
const port = 4000

// Setup
app.use(express.json())
const usersRoute = require('./routes/users')


// APIs
app.use('/users', usersRoute);


app.get('/', (req, res) => {
  res.send("Hello Worldoooooooooo!")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


export {};