const express = require("express");
const passport = require("passport");
const router = express.Router();

// for asking token. handled by passport middelware
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("Login with google");
  },
);

router.get("/logout", (req, res, next) => {
  // terminate existing login session. effects browser cookie
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173/login");
  });
});

// for getting information. handled by passport middelware
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("http://localhost:5173");
  // populated by passport. send to frontend
  // res.send(req.user); 
});

module.exports = router;
