import { Router } from 'express'
import { GradeController } from '../../controllers'

const gradeRouter = Router()

gradeRouter.get('/', GradeController.getAll)
gradeRouter.post('/', GradeController.create)
gradeRouter.put('/:id', GradeController.update)
gradeRouter.delete('/:id', GradeController.deleteById)

export default gradeRouter
