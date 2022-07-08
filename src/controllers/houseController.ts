import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
  CurrentUser,
  BadRequestError,
} from 'routing-controllers'
import { IHouse } from '../models/houseModel'
import { HouseholdService } from '../services/householdService'

@JsonController('/api/v1')

/**
 * All the validations
 * mapping request to service
 * mapping service result to API response
 */
export class HouseController {
  private householdService = new HouseholdService()

  @Post('/create')
  async createHousehold(@Body() household: IHouse) {
    const result = this.householdService.createHousehold(household)
    return result
  }
}
