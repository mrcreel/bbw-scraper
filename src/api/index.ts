import express, { Request, Response } from 'express'
import MessageResponse from '../interfaces/MessageResponse'
import products from './products/products.routes'

const router = express.Router()

router.get(`/`, (req: Request, res: Response<MessageResponse>) => {
  res.json({
    message: 'http://localhost:5000/api/v1',
  })
})

router.use('/products', products)

export default router
