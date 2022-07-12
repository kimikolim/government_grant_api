import Joi from 'joi'
import { HousingType } from '../models/houseModel'

export const householdValidator = Joi.object({
  housingType: Joi.string()
    .valid(...Object.values(HousingType))
    .required(),
})
