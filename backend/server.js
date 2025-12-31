if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const methodOverride = require("method-override");
const path = require("path");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const { connectDB } = require("./src/config/db");
require("./src/config/passport"); // initialize strategies

const app = express();

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL
const SESSION_SECRET = process.env.SESSION_SECRET || "thisshouldbeabettersecret";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// DB
connectDB(DB_URL);

// Middlewares
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Sessions
const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  collectionName: "sessions",
  touchAfter: 24 * 60 * 60,
});
store.on("error", e => console.error("Session store error:", e));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: { secure: false }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.json({ ok: true, message: "EV RESQ API" });
});

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/drivers", require("./src/routes/driverRoutes"));
app.use("/api/hosts", require("./src/routes/hostRoutes"));
app.use("/api/booking/search", require("./src/routes/bookingRoutes"));
app.use("/api/chargers", require("./src/routes/chargerRoutes"));

// 404
app.all("*", (req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

app.listen(PORT, () => console.log(`🚀 EV RESQ backend running on http://localhost:${PORT}`));
