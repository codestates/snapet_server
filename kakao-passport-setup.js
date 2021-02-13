const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use(new KakaoStrategy({
    clientID : 'd6a57ce1302946bf783315ac6262c679',
    clientSecret: 'D2z2x3a6uveoBUzBN3GawRdzGHJN75ok', // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
    callbackURL : 'https://localhost:5000/kakao/callback'
    },
    (accessToken, refreshToken, profile, done) => {
    // 사용자의 정보는 profile에 들어있다.
    return done(null, profile)
    }
))