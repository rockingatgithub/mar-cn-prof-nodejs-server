const passport = require('passport');
const Student = require('../models/student');
const passportLocal = require('passport-local').Strategy


passport.use(new passportLocal({
        usernameField: 'name',
        passwordField: 'password',
        session: false
    },
    function(username, password, done) {
      Student.findOne({ name: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Student.findById(id, function (err, user) {
      done(err, user);
    });
  });


  module.exports = passport