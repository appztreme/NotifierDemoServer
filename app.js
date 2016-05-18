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

let id = 1;
const createNotification = () => {
    return {
        id: id++,
        title: 'Notification',
        date: new Date(),
        type: Math.floor(Math.random() * 4) + 1,
        message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate',
        accepted: false,
        read: false
    };
}

io.on("connection", (socket) => {
    console.log('connection established...');
    const notification = {text: "Hello, world!"};

    // to make things interesting, have it send every second
    var interval = setInterval(() => {
        socket.emit("notification", createNotification());
    }, 10000);

    socket.on("disconnect", () => {
        clearInterval(interval);
    });
    socket.on("error", (e) => {
        console.log("ERROR:", e);
    });
});


module.exports = server;
