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
    Params,
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
  export class GrantController {
  
  
    @Get('/grant')
    async getAllHouseholds() {
    
    }
  
    @Get('/grant')
    async getHouseholdById(@Param('houseId') houseId: string) {
      
    }
  }
  