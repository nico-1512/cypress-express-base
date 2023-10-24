const express = require('express');
const app = express()
const port = 4000

// Setup
app.use(express.json())
const usersRoute = require('./routes/users')
const s3Route = require('./routes/s3')


// APIs
app.use('/users', usersRoute);
app.use('/s3', s3Route);


app.get('/', (req, res) => {
  res.send("Hello Worldoooooooooo!")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
