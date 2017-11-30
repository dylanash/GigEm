const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/index');


passport.serializeUser((user, done ) => {
<<<<<<< HEAD
    // console.log('tryin;',user[0].google_id)
    user = user[0].google_id || null
=======
    console.log('user has been serialized!')
>>>>>>> 20de9f47
    done(null, user);
});

passport.deserializeUser((id, done) => {
    db.checkUser(id, (err, user) => {
       done(err, user);
    })
       
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
    (accessToken, refreshToken, profile, done) => {
    //    console.log(profile)
        const id = profile.id
        db.checkUser(id, (err, data) => {
            if(err){
                console.log(err)
            } else {
                if(data.length > 0){
                    console.log('User is in the DB')
                    return done(null, data)
            } else {
                console.log('adding new users');
                db.newUser(profile, (err, data) =>{
                    if(err){
                        console.log('err trying to add new user', err);
                    } else {
                        console.log('NEW USER ADDED!!', data)
                        done(null, data )
                    }
                })
            }
            }
        });
    }
));