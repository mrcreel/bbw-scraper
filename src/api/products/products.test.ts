import request from 'supertest'

import app from '../../app'
import { Products } from './products.model'

beforeAll(async () => {
  try {
    await Products.drop()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {}
})

describe('GET /api/v1/products', () => {
  it('Responds with an array of products', async () =>
    request(app)
      .get('/api/v1/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length')
        expect(response.body.length).toBe(0)
      }))
})

let id = ''

describe('POST /api/v1/products', () => {
  it('responds with an error if the todo is invalid', async () =>
    request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send({
        upc: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message')
      }))
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/products')
      .set('Accept', 'application/json')
      .send({
        upc: '88888888',
        name: 'Inserted test object',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id')
        id = response.body._id
        expect(response.body.upc).toBe('88888888')
        expect(response.body).toHaveProperty('upc')
        expect(response.body).toHaveProperty('name')
      }))
})

describe('GET /api/v1/product/:id', () => {
  it('responds with a single product', async () =>
    request(app)
      .get(`/api/v1/products/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id')
        expect(response.body._id).toBe(id)
        expect(response.body).toHaveProperty('upc')
        expect(response.body.upc).toBe('88888888')
        expect(response.body).toHaveProperty('name')
        expect(response.body.name).toBe('Inserted test object')
      }))
  it('responds with a Invalid ObjectId error', (done) => {
    request(app)
      .get(`/api/v1/products/bgfdcytgtrfgt`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done)
  })

  it('responds with a Not Found', (done) => {
    request(app)
      .get(`/api/v1/products/673285d7e8c399ad80dc6b64`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  })
})

describe('PUT /api/v1/product/:id', () => {
  it('responds with a Invalid ObjectId error', (done) => {
    request(app)
      .put(`/api/v1/products/bgfdcytgtrfgt`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done)
  })

  it('responds with a Not Found', (done) => {
    request(app)
      .put(`/api/v1/products/673285d7e8c399ad80dc6b64`)
      .set('Accept', 'application/json')
      .send({
        upc: '88888888',
        name: 'Updated test object',
      })
      .expect('Content-Type', /json/)
      .expect(404, done)
  })

  it('responds with a single updated product', async () =>
    request(app)
      .put(`/api/v1/products/${id}`)
      .set('Accept', 'application/json')
      .send({
        upc: '88888888',
        name: 'Updated test object',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id')
        expect(response.body._id).toBe(id)
        expect(response.body).toHaveProperty('upc')
        expect(response.body.upc).toBe('88888888')
        expect(response.body).toHaveProperty('name')
        expect(response.body.name).toBe('Updated test object')
      }))
})

describe('DELETE /api/v1/product/:id', () => {
  it('responds with a Invalid ObjectId error', (done) => {
    request(app)
      .delete(`/api/v1/products/bgfdcytgtrfgt`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done)
  })

  it('responds with a Not Found', (done) => {
    request(app)
      .delete(`/api/v1/products/673285d7e8c399ad80dc6b64`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  })

  it('responds with a 204 status code', (done) => {
    request(app).delete(`/api/v1/products/${id}`).expect(204, done)
  })

  it('responds with a Not Found', (done) => {
    request(app)
      .get(`/api/v1/products/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done)
  })
})
