import moment from 'moment'
import {
  JsonController,
  Param,
  Body,
  Post,
  Delete,
  BadRequestError,
} from 'routing-controllers'
import { IMemberDetails } from '../models/memberModel'
import { memberValidator } from '../resources/memberValidation'
import { MemberService } from '../services/MemberService'

@JsonController('/api/v1')

/**
 * All the validations
 * mapping request to service
 * mapping service result to API response
 */
export class MemberController {
  private memberService = new MemberService()

  @Post('/create/:houseId/member')
  async createHouseholdMember(
    @Param('houseId') houseId: string,
    @Body() member: IMemberDetails,
  ) {
    //Joi validation
    const validateMember = memberValidator.validate(member)
    if (validateMember.error) {
      const message = validateMember.error.details[0].message
      throw new BadRequestError(`${message}`)
    }

    //Calls create new family member service
    const result = this.memberService.createMemberByHousehold(houseId, member)
    return result
  }

  @Delete('/:houseId/:id')
  async deleteMemberById(
    @Param('id') id: string,
    @Param('houseId') houseId: string,
  ) {
    const result = this.memberService.deleteMemberById(houseId, id)
    return result
  }
}
