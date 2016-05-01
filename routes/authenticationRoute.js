'use strict';
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

router.post('/', (req, res, next) => {
    User.findOne({userEmail: req.body.userEmail})
        .exec()
        .then(user => {
            console.log("User:", user);
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
        })
        .catch(err => next(err));
});

module.exports = router;
