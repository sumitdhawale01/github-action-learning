const request = require('supertest');
const app = require('./server');

describe('GET /healthz', () => {
  it('returns 200 ok', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('ok');
  });
});

describe('GET /api/message', () => {
  it('returns a JSON message', async () => {
    const res = await request(app).get('/api/message');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('hostname');
  });
});

describe('GET /', () => {
  it('serves the frontend', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('<!DOCTYPE html>');
  });
});
