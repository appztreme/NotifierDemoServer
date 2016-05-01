'use strict';
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if(!err) {
                req.user = decoded._doc;
                req.isAuthenticated = true;
            } else {
                req.user = undefined;
                req.isAuthenticated = false;
            }
            next();
        });
    } else {
        req.user = undefined;
        req.isAuthenticated = false;
        next();
    }
};

exports.requiresAuthentication = (req, res, next) => {
    if(!req.isAuthenticated) {
        res.status(403).end();
    } else {
        next();
    }
};

exports.requiresRole = (role) => {
    return function(req, res, next) {
        if(!req.isAuthenticated || req.user.roles.indexOf(role) === -1) {
            res.status(403).end();
        } else {
            next();
        }
    };
};
