'use strict';
const router = require('express').Router();
const wrap = require('co-express');
const jwt = require('jsonwebtoken');
const userRepo = require('./../repositories/userRepository');

router.post('/', wrap(function* (req, res, next) {
    let user;
    try {
        user = yield userRepo.findByEmail(req.body.userEmail);
    } catch (e) {
        next(e);
    }
    if(!user) {
        res.status(401)
            .json({ success: false,
                    message: "No user found with email " + req.body.userEmail });
    } else {
        if(!user.authenticate(req.body.password)) {
            res.status(401)
                .json({ success: false,
                        message: "Incorrect password" });
        } else {
            let token = jwt.sign(user, 'secret', { expiresIn: "2d" })
                            res.json({ success: true,
                                       message: "Authentication succeeded",
                                       token: token });
        }
    }
}));

module.exports = router;
