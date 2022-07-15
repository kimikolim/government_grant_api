import mongoose from 'mongoose'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers'
import { HouseholdModel } from '../models/houseModel'
import { MembersModel } from '../models/memberModel'

export const houseIdChecker = async (houseId: string) => {
  if (!mongoose.Types.ObjectId.isValid(houseId)) {
    throw new BadRequestError('Invalid House ID provided.')
  }

  let houseSearch = null
  try {
    houseSearch = await HouseholdModel.find({ _id: houseId })
  } catch (error) {
    throw new InternalServerError(`${error}`)
  }
  if (!houseSearch.length) {
    throw new NotFoundError('Error: No valid household found.')
  }
}

export const memberIdChecker = async(id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError('Invalid Member ID provided.')
  }

  let memberSearch = null
  try {
    memberSearch = await MembersModel.find({ _id: id })
  } catch (error) {
    throw new InternalServerError(`${error}`)
  }
  if (!memberSearch.length) {
    throw new NotFoundError('Error: No valid family member found.')
  }
}
