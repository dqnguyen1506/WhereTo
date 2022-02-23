const jwt = require('jsonwebtoken');

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  //allow OPTIONS request to continue ==> allows the actual requests(POST, PATCH, etc.) to go through
  if(req.method === 'OPTIONS'){
    return next();
  }
  try {
    //Authorization: 'Bearer TOKEN' ==> naming convention
    const token = req.headers.authorization.split(" ")[1]; //[Bearer, TOKEN] ==> extract TOKEN
    if (!token) {
      throw new HttpError("Authentication failed!");
    }
    //verify and return the payload that encoded into the token (id, email)
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    //add to request the userId acquire from the decoded token ==> authentication (only authorized user can edit/delete place)
    req.userData = {userId: decodedToken.userId};
    //valid token ==> allow request to continue travelling through other middlewares
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403); //forbidden
    return next(error);
  }
};
