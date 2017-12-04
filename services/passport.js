const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/index');


passport.serializeUser((user, done ) => {

    console.log('seralizing', user.id)
    user = user.id || null


    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('deserializeUser')
    done(null, obj);
  });

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
    scope: [
    'profile', 
    'https://www.googleapis.com/auth/user.emails.read'
    ], 
  },

  function(accessToken, refreshToken, params, profile, done) {
    console.log('passport user id: ', profile.id);
    profile.accessToken = accessToken;
    profile.expires_in = params.expires_in;
    if (refreshToken !== undefined) profile.refreshToken = refreshToken;
    // console.log(profile)
    db.User.findOne({where : {googleId: profile.id}})
      .then(function(obj) {
<<<<<<< HEAD
        if (obj.googleId) {
            done(null, obj.googleId)
        } else {
            db.User.create({
                // accessToken: accessToken,
               googleId: profile.id,
               name: profile.displayName,
               email: profile.emails[0].value,
            //    photo: profile.photots[0].value
                })       
=======
       
        // if that obj exists
        if (obj) {  
          console.log('found User:', obj)
          return obj.update({
            // accessToken : profile.accessToken, 
            // expires_in : profile.expires_in, 
            // refreshToken : profile.refreshToken,
            // profileJSON : profile._json
          })
        } else {
            // console.log('no db.User entry found');
            // console.log('profile: ', profile);
          return db.User.create({
            googleId : profile.id,
            name: profile.displayName,
            // accessToken : profile.accessToken, 
            // expires_in : profile.expires_in, 
            // refreshToken : profile.refreshToken,
            // profileJSON : profile._json
          })
>>>>>>> getitauth
        }
      })
      .then((profile) => done(null, profile))
    }))
