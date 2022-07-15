import { createExpressServer } from "routing-controllers"
import { GrantController } from "./controllers/GrantController"
import { HouseController } from "./controllers/HouseController"
import { MemberController } from "./controllers/MemberController"
import { ErrorHandler } from "./errors/ErrorHandler"

export const createApp = () => {
  const app = createExpressServer({
    cors: true,
    controllers: [HouseController, MemberController, GrantController],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler]
  })
  return app
}