import express from 'express'
import { brandController } from '../controllers/index.js'

// Khai báo đối tượng Router
const brandRouter = express.Router()


brandRouter.get('/', brandController.findAll)
brandRouter.post('/', brandController.createOne)
brandRouter.get('/:id', brandController.findOne)
brandRouter.delete('/:id', brandController.deleteOne)
// hay bị nhầm tên hàm
brandRouter.put('/:id', brandController.updateOne)

export default brandRouter