import BaseJoi from 'joi'
import JoiDate from '@joi/date'
const Joi = BaseJoi.extend(JoiDate)
import { Gender, MaritalStatus, OccupationType } from '../models/memberModel'

export const memberValidator = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  gender: Joi.string().valid(...Object.values(Gender)).required(),
  maritalStatus: Joi.string()
    .valid(...Object.values(MaritalStatus))
    .required(),
  spouse: Joi.string().min(0),
  occupationType: Joi.string()
    .valid(...Object.values(OccupationType))
    .required(),
  annualIncome: Joi.number().integer().min(0).required(),
  DOB: Joi.date().format('DD/MM/YYYY').required(),
})
