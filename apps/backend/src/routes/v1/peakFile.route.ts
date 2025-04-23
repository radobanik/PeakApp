import { Router } from 'express'
import { PeakFileController } from '../../controllers/index'
import multer from 'multer'

const peakFileRouter = Router()

const fileStorage = multer.memoryStorage()
const fileUpload = multer({ storage: fileStorage })

peakFileRouter.get('/:id', PeakFileController.getById)
peakFileRouter.post('/', fileUpload.single('file'), PeakFileController.create)
peakFileRouter.delete('/:id', PeakFileController.deleteById)

export default peakFileRouter
