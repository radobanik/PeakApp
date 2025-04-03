import { Response } from 'express'
import { SafeParseReturnType } from 'zod'
import { HTTP_STATUS } from '../../controllers/utils/httpStatusCodes'

const requestValidator = <In, Out>(
  validator: () => SafeParseReturnType<In, Out>,
  res: Response
): Out | false => {
  const validationResult = validator()
  if (validationResult.success) {
    return validationResult.data
  }
  res.status(HTTP_STATUS.BAD_REQUEST_400).json({
    error: 'Invalid payload',
    details: validationResult.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    })),
  })
  return false
}

export default requestValidator
