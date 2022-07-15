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
import { houseIdChecker } from '../utils/mongooseChecker'

export class HouseholdService {
  async getAllHouseholds() {
    try {
      const response = await HouseholdModel.find().populate('familyMembers')
      return new HouseholdListResponse('Fetched All Households', response)
    } catch (error) {
      throw new NotFoundError('Fetch households failed.')
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
     await houseIdChecker(houseId)

    /**
     * Deletes Household and all family members in household
     */
    try {
      const response = await HouseholdModel.findByIdAndDelete(houseId).populate('familyMembers')
      await MembersModel.deleteMany({ houseId: houseId })
      return new HouseResponse('Household deleted', response!)
    } catch (error) {
      throw new InternalServerError('Delete household failed.')
    }
  }
}
