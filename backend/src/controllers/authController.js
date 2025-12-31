const passport = require("passport");
const User = require("../models/User");
const Driver = require("../models/Driver");
const Host = require("../models/Host");

async function register(model, req, res) {
  try {
    const { name, email, password, phone } = req.body;
    const extra = { ...req.body };
    delete extra.password;
    const entity = new model({ name, email, phone, ...extra });
    await model.register(entity, password);
    req.login({ ...entity.toObject(), role: entity.role }, (err) => {
      if (err) return res.status(500).json({ ok: false, message: "Login failed" });
      return res.json({ ok: true, user: { id: entity._id, role: entity.role, name: entity.name, email: entity.email } });
    });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message });
  }
}

function login(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ ok: false, message: info?.message || "Invalid credentials" });
      req.login(user, (err2) => {
        if (err2) return next(err2);
        return res.json({ ok: true, user: { id: user._id, role: user.role, name: user.name, email: user.email } });
      });
    })(req, res, next);
  };
}

function me(req, res) {
  if (!req.user) return res.json({ ok: true, user: null });
  const { _id, role, name, email } = req.user;
  res.json({ ok: true, user: { id: _id, role, name, email } });
}

function logout(req, res) {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("evresq.sid");
      res.json({ ok: true, message: "Logged out" });
    });
  });
}

module.exports = {
  registerUser: (req, res) => register(User, req, res),
  registerDriver: (req, res) => register(Driver, req, res),
  registerHost: (req, res) => register(Host, req, res),
  loginUser: login("user-local"),
  loginDriver: login("driver-local"),
  loginHost: login("host-local"),
  me,
  logout
};
