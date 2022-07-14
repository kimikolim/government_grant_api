import mongoose from 'mongoose'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers'
import { HouseholdModel, IHouse } from '../models/houseModel'
import { MembersModel } from '../models/memberModel'
import {
  HouseholdListResponse,
  HouseResponse,
} from '../resources/houseHoldResponse'

export class HouseholdService {
  async getAllHouseholds() {
    try {
      const response = await HouseholdModel.find().populate('familyMembers')
      return new HouseholdListResponse('Fetched All Households', response)
    } catch (error) {
      throw new BadRequestError('Fetch households failed.')
    }
  }

  async getHouseholdById(houseId: string) {
    try {
      const response = await HouseholdModel.findById({ _id: houseId }).populate(
        'familyMembers',
      )
      return new HouseResponse('Household Found!', response)
    } catch (error) {
      throw new NotFoundError('Error: Unable to find Household.')
    }
  }

  async createHousehold(household: IHouse) {
    const { housingType, familyMembers } = household
    const newHousehold = new HouseholdModel({
      housingType,
      familyMembers,
    })

    try {
      const response = await HouseholdModel.create(newHousehold) //writes to db
      return new HouseResponse('New Household created', response)
    } catch (error) {
      throw new BadRequestError('New Household not created successfully')
    }
  }

  async deleteHouseById(houseId: string) {
    /**
     * Check for valid IDs provided
     */

    if (!mongoose.Types.ObjectId.isValid(houseId)) {
      return new BadRequestError('Invalid House ID')
    }

    /**
     * Checks if Family Member & Househ exists
     */

    let houseSearch = null
    try {
      houseSearch = await HouseholdModel.find({ _id: houseId })
    } catch (error) {
      return new InternalServerError(`${error}`)
    }
    if (!houseSearch.length) {
      return new NotFoundError('Error: No valid household found.')
    }

    /**
     * Deletes Household and all family members in household
     */

    try {
      const response = await HouseholdModel.findByIdAndDelete(houseId)
      await MembersModel.deleteMany({ houseId: houseId })
      return new HouseResponse('Household deleted', response!)
    } catch (error) {
      throw new BadRequestError('Delete household failed.')
    }
  }
}
