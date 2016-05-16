'use strict';
const expect = require('expect');
const io = require('socket.io-client');

describe('Socket server test', () => {
    let socket;
    beforeEach(done => {
        socket = io.connect('http://localhost:3000', {
            'reconnection delay' : 0,
            'reopen delay' : 0,
            'force new connection' : true,
        });
        socket.on('connect', () => {
            console.log('worked...');
            done();
        });
        socket.on('disconnect', () => {
            console.log('disconnected...');
        })
    });

    afterEach(function(done) {
        if(socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

    describe('First (hopefully useful) test', function() {

        it('Doing some things with indexOf()', function(done) {
            expect([1, 2, 3].indexOf(5)).toEqual(-1);
            expect([1, 2, 3].indexOf(0)).toEqual(-1);
            done();
        });

        it('Doing something else with indexOf()', function(done) {
            expect([1, 2, 3].indexOf(5)).toEqual(-1);
            expect([1, 2, 3].indexOf(0)).toEqual(-1);
            done();
        });

    });

});
