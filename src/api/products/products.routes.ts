import { Router } from 'express'
import * as ProductHandler from './products.handlers'
import { Product } from './products.model'
import { validateRequest } from '../../middlewares'
import { ParamsWithId } from '../../interfaces/ParamsWithId'

const router = Router()

router.get('/', ProductHandler.FindAll)

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ProductHandler.FindOne,
)

router.post(
  '/',
  validateRequest({
    body: Product,
  }),
  ProductHandler.InsertOne,
)

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Product,
  }),
  ProductHandler.UpdateOne,
)

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ProductHandler.DeleteOne,
)

export default router
