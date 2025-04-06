import * as z from 'zod'

import { db } from '../../db'
import { WithId } from 'mongodb'

export const Product = z.object({
  upc: z.string().min(1),
  name: z.string().min(1),
})

export type Product = z.infer<typeof Product>
export type ProductWithId = WithId<Product>
export const Products = db.collection<Product>('products')
