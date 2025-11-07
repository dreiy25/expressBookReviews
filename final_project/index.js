const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js'); // single import

const app = express();

app.use(express.json());

// Session middleware
app.use("/customer", session({ secret:"fingerprint_customer", resave: true, saveUninitialized: true }));

// Auth middleware for protected routes
app.use("/customer/auth/*", function auth(req, res, next){
  if (!req.session.username) {
    return res.status(401).json({ message: "You must be logged in to post a review." });
  }
  next();
});

const PORT = 5000;

// Routes
app.use("/customer", customer_routes);
app.use("/", genl_routes.public_users);      // public routes
app.use("/genl_users", genl_routes.genl_users); // axios ISBN Promise route

app.listen(PORT, () => console.log("Server is running"));