import { Router } from 'express'
import {
  getAllMovements,
  getMovementById,
  getMovementsByProduct,
  createMovement
} from '../controllers/stockMovementController.js'

const router = Router()

router.get('/', getAllMovements)
router.get('/product/:productId', getMovementsByProduct)
router.get('/:id', getMovementById)
router.post('/', createMovement)

export default router