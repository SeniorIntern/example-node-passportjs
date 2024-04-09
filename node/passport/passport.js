const passport = require("passport");
const User = require("../model/user");
const dotenv = require("dotenv");
dotenv.config();
var GoogleStrategy = require("passport-google-oauth20").Strategy;

// serialzie, deserialize middleware
// will be injected in main module
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// passport middleware
// will be injected in main module
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SERVER,
      callbackURL: process.env.CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, next) {
      console.log("MY PROFILE", profile._json.email);
      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("User already exits in DB", user);
          // create a property user on req body
          next(null, user); // just how passport handles lul
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          })
            .then((user) => {
              console.log("New User", user);
              // create a property user on req body
              next(null, user); // just how passport handles lul
            })
            .catch((err) => console.log(err));
        }
      });
    },
  ),
);
