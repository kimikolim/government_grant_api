import { BadRequestError, NotFoundError } from 'routing-controllers'
import { HouseholdModel, IHouse } from '../models/houseModel'
import {
  HouseholdListResponse,
  HouseResponse,
} from '../resources/houseHoldResponse'

export class HouseholdService {
  async getAllHouseholds() {
    try {
      const response = await HouseholdModel.find().populate('familyMembers')
      console.log(response)
      return new HouseholdListResponse('Fetched All Households', response)
    } catch (error) {
      throw new BadRequestError('Fetch households failed.')
    }
  }

  async getHouseholdById(houseId: string) {
    try {
      const response = await HouseholdModel.findById({ _id: houseId }).populate('familyMembers')
      console.log(response)
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
      //create()
      const response = await HouseholdModel.create(newHousehold) //writes to db
      console.log(response)
      return new HouseResponse('New Household created', response)
    } catch (error) {
      throw new BadRequestError('New Household not created successfully')
    }
  }
}
