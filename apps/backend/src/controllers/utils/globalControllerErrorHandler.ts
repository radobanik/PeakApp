import { Request, Response } from 'express'
import { HTTP_STATUS } from './httpStatusCodes'

const globalErrorHandler = (err: unknown, req: Request, res: Response) => {
  const errMessage = getErrorMessage(err)
  console.log(errMessage)

  // request already sent
  if (res.headersSent) {
    return
  }

  // TODO hadle prisma DB constaints: it is not server error, but user error

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
    error: {
      message: 'Internal server error',
    },
  })
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message)
  } else if (typeof error === 'string') {
    return error
  }
  return ''
}

export default globalErrorHandler
