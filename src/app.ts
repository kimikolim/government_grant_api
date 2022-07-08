import { createExpressServer } from "routing-controllers"
import { HouseController } from "./controllers/houseController"
import { ErrorHandler } from "./errors/ErrorHandler"

export const createApp = () => {
  const app = createExpressServer({
    cors: true,
    controllers: [HouseController],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler]
  })
  return app
}