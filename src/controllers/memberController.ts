import moment from 'moment'
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
import { IMemberDetails } from '../models/memberModel'
import { MemberService } from '../services/memberService'

@JsonController('/api/v1')

/**
 * All the validations
 * mapping request to service
 * mapping service result to API response
 */
export class MemberController {
  private memberService = new MemberService()

  @Post('/create/:houseId/member')
  async createHousehold(
    @Param('houseId') houseId: string,
    @Body() member: IMemberDetails,
  ) {
      const result = this.memberService.createMemberByHousehold(houseId, member)
      return result
  }
}
