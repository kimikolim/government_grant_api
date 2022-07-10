import { BadRequestError } from 'routing-controllers'
import { HouseholdModel, IHouse } from '../models/houseModel'
import { HouseResponse } from '../resources/houseHoldResponse'

export class HouseholdService {
  async createHousehold(household: IHouse) {
    const { housingType, familyMembers } = household
    const newHousehold = new HouseholdModel({
      housingType,
      familyMembers
    })

    try {
      const response = await newHousehold.save() //writes to db
      return new HouseResponse('New Household created', response)
    } catch (error) {
      throw new BadRequestError('New Household not created successfully')
    }
  }
}
