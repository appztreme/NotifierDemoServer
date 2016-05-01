'use strict';
const router = require('express').Router();
const wrap = require('co-express');
const auth = require('./../authentication/authentication');
const userRepo = require('./../repositories/userRepository');

router.get('/:userId', auth.requiresAuthentication, wrap(function* (req, res, next) {
    let user;
    try {
        user = yield userRepo.findById(req.params.userId);
    } catch(e) {
        next(e);
    }
    res.json(user);
}));

module.exports = router;
