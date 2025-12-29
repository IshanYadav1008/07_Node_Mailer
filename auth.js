const User          = require('./models/User');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {  
    try{

      const user = await User.findOne({username: username});

      if(!user){
        return done(null, false, { message: 'Incorrect Username.' });
      }
  
      const isPasswordMatch = await user.comparePassword(password);
  
      if(!isPasswordMatch){
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);

    }
    catch(err){
      return done(err);
    }
  }))

  module.exports = passport;