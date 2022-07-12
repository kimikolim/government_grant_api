import { createExpressServer } from "routing-controllers"
import { GrantController } from "./controllers/grantController"
import { HouseController } from "./controllers/houseController"
import { MemberController } from "./controllers/memberController"
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