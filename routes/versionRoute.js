'use strict';
const router = require('express').Router();
const pjson = require('./../package.json');

router.get('/', (req, res, next) => {
    res.json({version: pjson.version});
});

module.exports = router;
