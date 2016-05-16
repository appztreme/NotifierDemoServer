'use strict';
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const compression = require('compression');
const bodyParser = require('body-parser');
const auth = require('./authentication/authentication');

const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(auth.authenticate);

app.use('/api/authenticate', require('./routes/authenticationRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/version', require('./routes/versionRoute'));

const server = http.createServer(app);
const io = socket.listen(server);

io.on("connection", (socket) => {
    console.log('connection established...');
    const notification = {text: "Hello, world!"};

    // to make things interesting, have it send every second
    var interval = setInterval(() => {
        socket.emit("notification", notification);
    }, 10000);

    socket.on("disconnect", () => {
        clearInterval(interval);
    });
    socket.on("error", (e) => {
        console.log("ERROR:", e);
    });
});


module.exports = server;
