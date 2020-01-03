const config = require("config");
const jwt = require("jsonwebtoken");

// authorize user. get token sent from server
function authorize(req, res, next) {
  // header values are in reqs, so check request header for token
  const token = req.header("auth-token");

  // Check for token
  // this caused Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client. needed to send return to exit
  if (!token) {
    return res.status(401).json({ msg: "No token. Authorization denied." });
  }

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded; // returns decoded user information from header
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid." });
  }
}

module.exports = authorize;
