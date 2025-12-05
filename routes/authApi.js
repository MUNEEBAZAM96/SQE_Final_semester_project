const express = require("express");

const router = express.Router();

const { catchErrors } = require("../handlers/errorHandlers");
const { isValidToken, login, logout } = require("../controllers/authController");

// For this SQA project we use the real login controller (not the demo login).
// This ensures proper validation, error handling and JWT-based auth flow.
router.route("/login").post(catchErrors(login));
router.route("/logout").post(isValidToken, catchErrors(logout));

module.exports = router;
