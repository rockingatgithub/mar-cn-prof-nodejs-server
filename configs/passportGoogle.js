const passport =require("passport");
const Student = require("../models/student");
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"",
        clientSecret:"",
        callbackURL: "http://localhost:8000/google/callback",
        passReqToCallback   : true
    },
    async function(request, accessToken, refreshToken, profile, done) {

            let user = await Student.findOne({name: profile.email})
            if(!user){
                user = await Student.create({name: profile.email, roll: Math.random()})
            }

            console.log("the profile", user)
            return done(null, user);
    }
));

module.exports = passport