'use strict';
const router = require('express').Router();
const User = require('./../models/user');

router.get('/:userId', (req, res, next) => {
    User.findById({_id: req.params.userId})
        .select('firstName lastName userEmail userTel roles')
        .exec()
        .then(user => {
            res.json(user);
        })
        .catch(err => next(err));
});

module.exports = router;
