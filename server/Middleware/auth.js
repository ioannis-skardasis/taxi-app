const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.send({ msg: "Not authorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "Not valid token" });
    }

    const verifiedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);

    if (!verifiedToken) {
      return res.send({ msg: "Invalid Token" });
    } else {
      req.user = verifiedToken;
      next();
    }
  } catch (error) {
    res.status(500).send({ msg: "ERROR!!!", error });
  }
};

module.exports = verifyToken;

