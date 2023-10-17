const express = require('express');

const app = express()
const port = 4000

// Setup
app.use(express.json())
const usersRoute = require('./routes/users')


// APIs
app.use('/users', usersRoute);


app.get('/', (req, res) => {

  // await .then(() => console.log('Connected!'));
  res.send("Hello World!")
  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

