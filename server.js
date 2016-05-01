'use strict';
var app = require('./app');

const PORT = 3000;
app.listen(PORT, function() {
	console.log("Notifier is listening on port " + PORT + " ...");
});
