require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  //check authentication then handle requests and responses
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get("Authorization");

    //if there is no token then, send error 402
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;

    //verify token exists and if not verified send error
    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    //if there is no token at all, then dont log in or authenticate
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    //if authenticated then send them to the next page?
    next();
  },
};
