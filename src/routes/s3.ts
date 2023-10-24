import * as AWS from 'aws-sdk';
import * as express from 'express';

const space = new AWS.S3({
  region: 'eu-west-1',
  endpoint: 'http://localhost:9000/test',
  s3ForcePathStyle: true, 
  credentials: new AWS.Credentials(
    "PYmH1fmWew4cXfqfMdT8",
    "OrCrco3wP3o3T30VTPcwZdYVad8j1hi1A4E0Gmmr"
  ),
});

const router = express.Router();

router.get('', (req, res) => {
  res.status(200);
  return res.send('MinIO API`s')
})

/**
 * Insert into S3 bucket a new file
 * @param {string} filePath: the local path to the file
 */
router.post('', async (req: any, res: any) => {
  
  const file = req.body.filePath || '';
  
  const params = {
    Bucket: "test",
    Key: file.substring(file.lastIndexOf('/')+1, file.length)
  };

  space.putObject(params, (err, data) => {
    if(err){
      res.status(400);
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
      Bucket: "test",
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
