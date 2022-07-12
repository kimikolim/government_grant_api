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
import { getHouseholdIncome } from '../utils/grants'

@JsonController('/api/v1')

/**
 * All Grants and Schemes
 */
export class GrantController {
  @Get('/grant/student-encouragment-bonus')
  async getStudentEncouragementBonus() {
    getHouseholdIncome()
    return {
        message: "test function"
    }
  }

  @Get('/grant/family-togetherness-scheme')
  async getFamilyTogethernessScheme() {}

  @Get('/grant/elder-bonus')
  async getElderBonus() {}

  @Get('/grant/baby-sunshine-grant')
  async getBabySunshineGrant() {}

  @Get('/grant/yolo-gst-grant')
  async getYoloGstGrant() {}
}
