/* eslint-disable dot-notation */
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'class-validator'
@Middleware({
  type: 'after',
})
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  private static readonly REQUEST_VALIDATION_ERROR_MESSAGE: string =
    'Invalid request params.'

  private static readonly SERVER_ERROR_MESSAGE: string =
    'Oops! Something went wrong.'

  private static readonly HTTP_STATUS_CODE_SERVER_ERROR = 500

  private isRequestValidationError(error: any) {
    return (
      Array.isArray(error.errors) &&
      error.errors.every((elem: any) => elem instanceof ValidationError)
    )
  }

  error(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    let errorMessage = error.message
    let httpCode = error.httpCode
    console.error(`${error.stack}`)
    if (this.isRequestValidationError(error)) {
      errorMessage = ErrorHandler.REQUEST_VALIDATION_ERROR_MESSAGE
    }
    if (!httpCode) {
      httpCode = ErrorHandler.HTTP_STATUS_CODE_SERVER_ERROR
      errorMessage = ErrorHandler.SERVER_ERROR_MESSAGE
    }

    response.status(httpCode)
    response.json({
      errorMessage,
    })
  }
}
