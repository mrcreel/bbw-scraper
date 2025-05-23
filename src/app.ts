/* eslint-disable @typescript-eslint/no-empty-object-type */
import express from 'express'

import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import * as middlewares from './middlewares'

import api from './api'

import MessageResponse from './interfaces/MessageResponse'

import {} from 'dotenv/config'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  })
})

app.use('/api/v0', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
