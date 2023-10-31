const jwt = require("jsonwebtoken");
//outsourced:
const http_status_text = require("../utils/http_status_text");
const app_error = require("../utils/app_error");

const verify_token = (req, res, next) => {
  // Get the auth header
  const auth_header =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!auth_header) {
    const error = app_error.create(
      "token is required..........",
      401,
      http_status_text.ERROR
    );

    return res.json(error);
  }

  // Get the token
  const token = auth_header.split(" ")[1];

  try {
    // Verify the token
    const decoded_token = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    // Store the decoded token in the request for future use
    req.decoded_token = decoded_token;
    next();
  } catch (err) {
    const error = app_error.create(
      "invalid token.",
      401,
      http_status_text.ERROR
    );
    return res.json(error);
  }
};

module.exports = verify_token;
