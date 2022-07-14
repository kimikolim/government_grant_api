import mongoose from "mongoose"
import { BadRequestError } from "routing-controllers"

export const mongooseIdChecker = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new BadRequestError('Invalid ID provided.')
      }
}
