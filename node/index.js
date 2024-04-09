const express = require("express");
const mongoose = require("mongoose");
const googleRouter = require("./routes/auth");
const dotenv = require("dotenv");
const passportConfig = require("./passport/passport");
const passport = require("passport");
var cookieSession = require("cookie-session");
const cors = require("cors");

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(
  cookieSession({
    keys: [process.env.SECRET_KEY], // just like JSON secret key
    // Cookie Options
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    httpOnly: false // to read with client side js
  }),
);

// patch issue with cookieSession version
// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session()); // use session middleware

// connect to MongoDB
mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// middlware function
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("http://localhost:5173/login");
    });
  }
  next();
};

// public routes
app.use("/auth", googleRouter);

app.get("/info", (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  }
  res.status(200).send("API is live");
});

// protected routes
app.get("/admin", isLoggedIn, (req, res) => {
  res.send("admin data");
});

// check if client has cookie
app.get("/isLoggedIn", (req, res) => {
  if (req.user) {
    return res.status(200).send({
      isLoggedIn: true,
      data: req.user,
    });
  }
  return res.status(200).send({ isLoggedIn: false });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`listening on port:${port}...`));
