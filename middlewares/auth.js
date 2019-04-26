const jwt = require('jsonwebtoken');
var config = require('../config/api.json');
const secret = config.API_SECRET; //+ user's unique secret";


jwtVerifyToken = function (req, res, next)
{
  const token = req.session.token;
  console.log('session: '+JSON.stringify(req.session));
  if (!token)
  {
    console.log('no token');
    return res.redirect('/')
  }
  return jwt.verify(token, secret, function(err, decoded)
  {
    if (err)
    {
      console.log('failed verification');
      return res.redirect('/')
    }

    // if everything good, save to request for use in other routes
    console.log('everything good');
    req.decoded = decoded;
    return next();
  });
}
module.exports = jwtVerifyToken;