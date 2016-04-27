'use strict';

const db = require('../db');
const crypto = require('crypto');

const userSchema = db.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
    userTel: { type: String, required: true },
	userEmail: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    salt: { type: String },
    roles: [String]
});

userSchema.index({userEmail: 1}, {unique: true});

userSchema.methods.authenticate = function(passwordToMatch) {
	return hashPwd(this.salt, passwordToMatch) === this.hashedPassword;
};
userSchema.methods.hashPassword = function(pwd) {
	this.salt = createSalt();
	this.hashedPassword = hashPwd(this.salt, pwd);
};

let createSalt = () => {
	return crypto.randomBytes(128).toString('base64');
};

let hashPwd = (salt, pwd) => {
	let hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
};

var User = db.model('User', userSchema);

module.exports = User;
