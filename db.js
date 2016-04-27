'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notifier_demo', () => {
    console.time('db_start');
    console.log('mongodb connected to notifier_demo');
    console.timeEnd('db_start');
});

module.exports = mongoose;
