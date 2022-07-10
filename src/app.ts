import { createExpressServer } from "routing-controllers"
import { HouseController } from "./controllers/houseController"
import { MemberController } from "./controllers/memberController"
import { ErrorHandler } from "./errors/ErrorHandler"

export const createApp = () => {
  const app = createExpressServer({
    cors: true,
    controllers: [HouseController, MemberController],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler]
  })
  return app
}