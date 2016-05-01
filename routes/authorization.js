'use strict';
const jwt = requires('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) {
                res.status(403).json({ success: false,
                    message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
      res.status(403).json({
          success: false,
          message: 'No token provided.'
      });
    }
};

exports.requiresApiLogin = function (req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = (role) => {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}
