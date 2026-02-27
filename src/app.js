const express = require("express");
const path = require("path");

const app = express();

// ─── View Engine ───
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// ─── Middleware ───
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Api ───
app.use("/api/v1/auth", require("./modules/v1/auth/auth.route"));

//* 404
app.use((req, res) => {
  res.render("404", { url: req.url });
});

//* Error Handler
app.use(require("./middlewares/errorHandler"));

module.exports = app;
