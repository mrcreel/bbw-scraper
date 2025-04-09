import request from 'supertest'

import app from '../app'

describe('GET /api/v0', () => {
  it('Responds with a json message', (done) => {
    request(app)
      .get('/api/v0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'http://localhost:5000/api/v0',
        },
        done,
      )
  })
})
/**
 * describe('GET /api/v0/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v0/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});

 */
