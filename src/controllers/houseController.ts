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
import { householdValidator } from '../resources/householdValidation'

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
    //Joi validation
    const validateHousehold = householdValidator.validate(household)
    if (validateHousehold.error) {
      const message = validateHousehold.error.details[0].message
      throw new BadRequestError(`${message}`)
    }
    //Calls create household service
    const result = this.householdService.createHousehold(household)
    return result
  }
}
