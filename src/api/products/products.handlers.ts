/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from 'express'
import { Product, Products, ProductWithId } from './products.model'
import { ParamsWithId } from '../../interfaces/ParamsWithId'
import { ObjectId } from 'mongodb'

export async function FindAll(
  req: Request,
  res: Response<ProductWithId[]>,
  next: NextFunction,
) {
  try {
    const products = await Products.find().toArray()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export async function InsertOne(
  req: Request<{}, ProductWithId, Product>,
  res: Response<ProductWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await Products.insertOne(req.body)
    if (!insertResult.acknowledged) throw new Error('Insert failed')
    res.status(201)
    res.json({
      ...req.body,
      _id: insertResult.insertedId,
    })
  } catch (error) {
    next(error)
  }
}

export async function FindOne(
  req: Request<ParamsWithId, ProductWithId, {}>,
  res: Response<ProductWithId>,
  next: NextFunction,
) {
  try {
    const result = await Products.findOne({
      _id: new ObjectId(req.params.id),
    })
    if (!result) {
      res.status(404)
      throw new Error(`Product with id: ${req.params.id} doesn't exist.`)
    } else {
      res.json(result)
    }
  } catch (error) {
    next(error)
  }
}

export async function UpdateOne(
  req: Request<ParamsWithId, ProductWithId, Product>,
  res: Response<ProductWithId>,
  next: NextFunction,
) {
  try {
    const result = await Products.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
      {
        returnDocument: 'after',
      },
    )
    if (!result) {
      res.status(404)
      throw new Error(`Product with id: ${req.params.id} doesn't exist.`)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export async function DeleteOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction,
) {
  try {
    const result = await Products.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    })
    if (!result) {
      res.status(404)
      throw new Error(`Product with id: ${req.params.id} doesn't exist.`)
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
