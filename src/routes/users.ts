// Requires and Imports
const express = require('express');
const md5 = require('md5');

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
  const user = {username: req.body.username, password: req.body.password};
  from(db.collection('users').find({
    username: user.username,
    password: md5(user.password)
  }).toArray())
  .subscribe(
    (result) => {
      if(result.length > 0) {
        res.status(201);
        return res.send('User found!');
      }else{
        // register
        if(user.password === req.body.repeatePassword){
          const newUser = {
            username: user.username,
            password: md5(user.password),
          }
          from(db.collection('users').insertOne(newUser)).subscribe(
            (result) => {
              res.status(201);
              return res.send('Registered successfully!');
            }
          )
        }else{
          res.status(401);
          return res.send("Bad request, error in either username or password fields")
        }
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

router.post('/changePassword', (req, res) => {
  
  const user = {
    username: req.body.username, 
    password: req.body.password,
  }
  const newPass = req.body.newPassword;
  const newPassRepeated = req.body.repeateNewPassword;
  from(db.collection('users').find({username: user.username, password: md5(user.password)}).toArray())
  .subscribe(
    (array) => {

      let element = array[0]; 
      if(element){
        // user has been found
        if(element.password === md5(user.password)){
          if(newPass === newPassRepeated){
            if(element.password !== md5(newPass)){
              from(db.collection('users').updateOne({_id: element._id}, {$set: {password: md5(newPass)}}))
                .subscribe((result) => {
                  if(result){
                    res.status(201)
                    return res.send("Password has been updated successfully!");
                  }
                })
            }else{
              res.status(403);
              return res.send('Passwords cannot be equals from the old one!');
            }
          }else{
            res.status(403);
            return res.send('Passwords doesn`t macth!');
          }
        }
      }else{
        res.status(403);
        return res.send('Password not match!');
      }
    })

})



// Export module
module.exports = router;

export {};