import { createExpressServer } from "routing-controllers"
import { ErrorHandler } from "./errors/ErrorHandler"

export const createApp = () => {
  const app = createExpressServer({
    cors: true,
    controllers: [],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler]
  })
  return app
}