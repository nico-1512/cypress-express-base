// Requires and Imports
const express = require('express');
const { from } = require('rxjs');
const { omit } = require('radash')
const { MongoClient } = require('mongodb');

const url = 'mongodb://admin:admin@localhost:27017';
const client = new MongoClient(url);
const dbName = 'users';

// Vars
const router = express.Router();
client.connect();
const db = client.db(dbName);

// Routes
router.post('/', (req, res) => {
  from(db.collection('users').find({username: req.body.username, password: req.body.password}).toArray())
  .subscribe(
    (result) => {
      if(result.length > 0) {
        res.status(201);
        return res.send('User found!');
      }else{
        res.status(404);
        return res.send('Not found!');
      }
    })
  })  

router.get('/', (req, res) => {
  from(db.collection('users').find({}).toArray())
  .subscribe(
    b => {
      if(b){
        return res.send(JSON.stringify(b.map((el) => omit(el, ['_id']))));
      }
    })

})



// Export module
module.exports = router;