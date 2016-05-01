'use strict';
const User = require('./../models/user');

exports.findByEmail = function* (email) {
    return yield User.findOne({userEmail: email})
        .exec();
}

exports.findById = function* (id) {
    return yield User.findById({_id: id})
        .select('firstName lastName userEmail userTel roles')
        .exec();
};
