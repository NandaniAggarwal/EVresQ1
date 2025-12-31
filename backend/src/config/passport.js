const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");
const Driver = require("../models/Driver");
const Host = require("../models/Host");

// Separate strategies per role
passport.use("user-local", new LocalStrategy({ usernameField: "email" }, User.authenticate()));
passport.use("driver-local", new LocalStrategy({ usernameField: "email" }, Driver.authenticate()));
passport.use("host-local", new LocalStrategy({ usernameField: "email" }, Host.authenticate()));

// Session handling
passport.serializeUser((entity, done) => {
  done(null, { id: entity._id, role: entity.role });
});

passport.deserializeUser(async (obj, done) => {
  try {
    const { id, role } = obj || {};
    if (!id || !role) return done(null, false);

    if (role === "user") return done(null, await User.findById(id));
    if (role === "driver") return done(null, await Driver.findById(id));
    if (role === "host") return done(null, await Host.findById(id));

    return done(null, false);
  } catch (e) {
    done(e);
  }
});
