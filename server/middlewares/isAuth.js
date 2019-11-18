/**
 * my token will be of the form:
 * { user: email, expirationTime: timeInHours }
 *
 */
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user");

module.exports = async (req, res, next) => {
  let decoded = null;
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      req.isAuth = false;
      return next();
    }

    const [bearer, token] = authorization.split(" ");
    if (!token) {
      req.isAuth = false;
      return next();
    }

    const isValidToken = await jwt.verify(token, "secretkey");
    if (!isValidToken) {
      req.isAuth = false;
      return next();
    }

    decoded = jwt.decode(token);
    if (!decoded || !decoded.user) {
      req.isAuth = false;
      return next();
    }

    const { user: userEmail } = decoded;
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      throw new Error();
    }

    req.isAuth = true;
    req.currentUser = user;
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  next();
};
