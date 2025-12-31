function dashboard(req, res) {
  res.json({ ok: true, message: "Host dashboard", host: { id: req.user._id, name: req.user.name, email: req.user.email } });
}
module.exports = { dashboard };
