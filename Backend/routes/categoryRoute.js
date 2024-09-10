import express from 'express'
import { categoryController } from '../controllers/index.js'

// Khai báo đối tượng Router
const categoryRouter = express.Router()


categoryRouter.get('/', categoryController.findAll)
categoryRouter.post('/', categoryController.createOne)
categoryRouter.get('/:id', categoryController.findOne)
categoryRouter.delete('/:id', categoryController.deleteOne)
// hay bị nhầm tên hàm
categoryRouter.put('/:id', categoryController.updateOne)

export default categoryRouter