import express from 'express'
import Product from '../models/product.js'
import mongoose from 'mongoose'
import { createproduct, deleteproduct, getproduct, updateproduct } from '../Controllers/Productcontrollers.js'
const router = express.Router()





router.get('/',getproduct)

router.post('/',createproduct)

router.put('/:id',updateproduct)

router.delete('/:id',deleteproduct)


export default router