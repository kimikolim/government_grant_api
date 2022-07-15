import { JsonController, Get } from 'routing-controllers'
import { GrantService } from '../services/GrantService'

@JsonController('/api/v1/grant')

/**
 * All Grants and Schemes
 */
export class GrantController {
  constructor(private grantService: GrantService = new GrantService()) {}

  /**
   * Household income < 150k
   * Age < 16
   */

  @Get('/student-encouragment-bonus')
  async getStudentEncouragementBonus() {
    return await this.grantService.getStudentEncouragementBonus()
  }

  /**
   * Marital Status only MARRIED w spouse
   * Age < 18
   */

  @Get('/family-togetherness-scheme')
  async getFamilyTogethernessScheme() {
    return await this.grantService.getFamilyTogethernessScheme()
  }

  /**
   * Must be HDB only
   * Age > 50
   */

  @Get('/elder-bonus')
  async getElderBonus() {
    return await this.grantService.getElderBonus()
  }

  /**
   * Household with age < 5
   */

  @Get('/baby-sunshine-grant')
  async getBabySunshineGrant() {
    return await this.grantService.getBabySunshineGrant()
  }

  /**
   * Household Annual Income < 100k
   * Must be HDB only
   */

  @Get('/yolo-gst-grant')
  async getYoloGstGrant() {
    return await this.grantService.getYoloGstGrant()
  }
}
