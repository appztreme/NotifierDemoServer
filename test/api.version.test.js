'use strict';

const expect = require('expect');
const request = require('supertest');
const app = require('./../app');

describe('VERSION', () => {
    describe('GET /api/version', () => {
        it('should return 200 response status', done => {
            request(app).get('/api/version')
                .end((err, res) => {
                    expect(err).toNotExist();
                    expect(res).toExist();
                    expect(res.status).toEqual(200);
                    done();
                });
        });
        it('should return version number', done => {
            request(app).get('/api/version')
                .end((err, res) => {
                    expect(res.body).toExist();
                    expect(res.body.hasOwnProperty('version')).toBe(true);
                    expect(res.body.version).toBeA('string');
                    expect(res.body.version).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
                    done();
                });
        });
    });
});
