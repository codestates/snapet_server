const express = require('express');
const app = express();
const https = require('https');
const passport = require('passport')
const fs = require('fs');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const serverOption = {
  key: fs.readFileSync(__dirname + '/key.pem','utf-8'),
  cert: fs.readFileSync(__dirname + '/cert.pem','utf-8'),
}
//passport 설정
require('./passport-setup');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cors
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT" ,"OPTION"],
  credentials: true,
  }));
//cookieSession
app.use(cookieSession({
    name:'snapet-session',
    keys: ['key1', 'key2']
}))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}
//passport middleware
app.use(passport.initialize())
app.use(passport.session())

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
const login = require('./controller/jwt/login')

app.put('/updateProfileImg', updateProfileImg);
app.put('/updateAboutMe', updateAboutMe);

app.post('/signup', signup);
app.post('/newpost', newpost);
//app.post('/deletePhoto', deletePhoto.post);
app.post('/likePhoto', likePhoto);
app.post('/deletePhoto', deletePhoto);

app.get('/mypagePosts', mypagePosts);
app.get('/feedPosts', feedPosts);
app.get('/userInfo', userInfo);

app.post("/login", require('./controller/jwt/login'));
app.get("/accesstokenrequest", require('./controller/jwt/accessTokenRequest'));
app.get("/refreshtokenrequest", require('./controller/jwt/refreshTokenRequest'))

//google Oauth
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
//실패 하면 /failed 으로 넘어감
    function(req, res) {
    // Successful authentication, redirect home.
    //console.log(req.user.emails)
    res.redirect('/');
    //성공하면 /good 이쪽으로 넘어감
    }
);
app.get('/kakao/callback', function (req, res, next) {
  passport.authenticate('kakao', function (err, user) {
    console.log('passport.authenticate(kakao)실행');
    if (!user) { return res.redirect('http://localhost:5000'); }
    req.logIn(user, function (err) { 
      console.log('kakao/callback user : ', user);
      return res.redirect('http://localhost:5000/');        
    });
  })(req, res);
});

app.get('/kakao', passport.authenticate('kakao'))

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

https.createServer(serverOption,app);
app.listen(5000);
