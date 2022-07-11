import { BadRequestError } from 'routing-controllers'
import { HouseholdModel, IHouse } from '../models/houseModel'
import {
  HouseholdListResponse,
  HouseResponse,
} from '../resources/houseHoldResponse'

export class HouseholdService {
  async getAllHouseholds() {
    try {
      const response = await HouseholdModel.find()
      return new HouseholdListResponse('Fetched All Households', response)
    } catch (error) {
      throw new BadRequestError('Fetch households failed.')
    }
  }

  async getHouseholdById(houseId: string) {
    try {
      const response = await HouseholdModel.findById({ _id: houseId }).populate('familyMembers')
      console.log(response?.toObject())
      return new HouseResponse('Household Found!', response?.toObject()!)
    } catch (error) {
      throw new BadRequestError('Error: Unable to find Household.')
    }
  }

  async createHousehold(household: IHouse) {
    const { housingType, familyMembers } = household
    const newHousehold = new HouseholdModel({
      housingType,
      familyMembers,
    })

    try {
      const response = await newHousehold.save() //writes to db
      return new HouseResponse('New Household created', response)
    } catch (error) {
      throw new BadRequestError('New Household not created successfully')
    }
  }
}
