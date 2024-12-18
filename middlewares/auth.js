const { isLoggedIn } = require("../controllers/auth.controller");
const requireLogin = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token && isLoggedIn({ headers: { authorization: token } })) {
    next();
  } else {
    console.log("User not logged in");
    res
      .status(401)
      .json({ error: true, message: "Unauthorized access. Login." });
  }
};

module.exports = { requireLogin };
