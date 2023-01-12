const passport = require("passport");
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const GOOGLE_CLIENT_ID = `${process.env.CLIENT_ID}`
// const GOOGLE_CLIENT_SECRET = `${process.env.CLIENT_SECRET}`

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
  },

  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});