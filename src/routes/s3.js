const AWS = require('aws-sdk') ;
const express = require('express');

const space = new AWS.S3({
  region: 'eu-west-1',
  endpoint: 'http://127.0.0.1:9000/',
  s3ForcePathStyle: true,
  credentials: new AWS.Credentials(
    process.env.MINIO_ROOT_USER,
    process.env.MINIO_ROOT_PASSWORD,
  ),
});


const router = express.Router();

router.get('', (req, res) => {
  res.status(200);
  return res.send('MinIO API`s')
})

router.get('/test', (req, res) => {
  space.listBuckets((err, data) => {
    if(err){
      return;
    }else{
      data.Buckets.forEach((bucket) => {
        if(bucket.Name === 'test'){
          res.status(200)
          return res.send("Bucket found!")
        }
      })
    }
  })
})

/**
 * Insert into S3 bucket a new file
 * @param {string} filePath: the local path to the file
 */
router.post('', async (req, res) => {

  const file = req.body.filePath || '';
  
  const params = {
    Bucket: 'test',
    Key: file.substring(file.lastIndexOf('/')+1, file.length)
  };

  space.putObject(params, (err, data) => {
    if(err){
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa error', err);
      res.status(403);
      return res.send()
    }else{
      console.log(data);
      
      res.status(200);
      return res.send(data)
    }   
  })
})

/**
 * Delete a file by it's name
 */
router.delete('/:id', (req, res) => {
  setTimeout(() => {
    
    const file = req.params.id || '';
  
    const params = {
      Bucket: 'test',
      Key: file
    }
  
    space.deleteObject(params, (err, data) => {
      if(err){
        res.status(400);
        return res.send()
      }else{
        res.status(200);
        return res.send()
      }   
    })
  }, 5000);
})

/**
 * Get a file by it's name
 */
router.get('/:id', (req, res) => {
  const file = req.params.id;
  const params = {
    Bucket: 'test',
    Key: file
  }
  space.headObject(params, (err, data) => {
    if(err){
      console.log(err);
      res.status(400);
      return res.send()
    }else{
      console.log(data);
      res.status(200);
      return res.send(data)
    }   
  })
})

module.exports = router;
