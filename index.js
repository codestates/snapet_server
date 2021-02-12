const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

//methods
const deletePhoto = require('./controller/deletePhoto');
const userInfo = require('./controller/userInfo');
const updateProfileImg = require('./controller/updateProfileImg');
const updateAboutMe = require('./controller/updateAboutMe');
const signup = require('./controller/signup');
const newpost = require('./controller/newpost');
const mypagePosts = require('./controller/mypagePosts');
const feedPosts = require('./controller/feedPosts');
const likePhoto = require('./controller/likePhoto');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/deletePhoto', deletePhoto.post);
app.get('/userInfo', userInfo);
app.put('/updateProfileImg', updateProfileImg);
app.put('/updateAboutMe', updateAboutMe);
app.post('/signup', signup);
app.post('/newpost', newpost);
app.get('/mypagePosts', mypagePosts);
app.get('/feedPosts', feedPosts);
app.post('/likePhoto', likePhoto);

https.createServer(
  {
    key: fs.readFileSync(
      __dirname + '/../../../../Seulji/keys/key.pem',
      'utf-8'
    ),
    cert: fs.readFileSync(
      __dirname + '/../../../../Seulji/keys/cert.pem',
      'utf-8'
    ),
  },
  app.use('/', (req, res) => {
    res.send('made https server');
  })
);
app.listen(5000);
