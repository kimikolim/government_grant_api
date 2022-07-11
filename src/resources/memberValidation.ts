import BaseJoi from 'joi'
import JoiDate from '@joi/date'
const Joi = BaseJoi.extend(JoiDate)
import { Gender, MaritalStatus, OccupationType } from '../models/memberModel'

export const memberValidator = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  gender: Joi.string().valid(Gender.FEMALE, Gender.MALE).required(),
  maritalStatus: Joi.string()
    .valid(MaritalStatus.DIVORCED, MaritalStatus.MARRIED, MaritalStatus.SINGLE)
    .required(),
  spouse: Joi.string().min(0),
  occupationType: Joi.string()
    .valid(
      OccupationType.EMPLOYED,
      OccupationType.STUDENT,
      OccupationType.UNEMPLOYED,
    )
    .required(),
  annualIncome: Joi.number().integer().min(0).required(),
  DOB: Joi.date().format('DD/MM/YYYY').required(),
})
