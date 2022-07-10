import { BadRequestError, NotFoundError } from 'routing-controllers'
import { HouseholdModel } from '../models/houseModel'
import { IMemberDetails, MembersModel } from '../models/memberModel'
import { MemberResponse } from '../resources/memberResponse'

export class MemberService {

  async createMemberByHousehold(houseId: string, member: IMemberDetails) {
    const {
      name,
      gender,
      maritalStatus,
      spouse,
      occupationType,
      annualIncome,
      DOB,
    } = member
    const newMember = new MembersModel({
      houseId,
      name,
      gender,
      maritalStatus,
      spouse,
      occupationType,
      annualIncome,
      DOB,
    })

    try {
      const response = await newMember.save() //writes to db
      const updateHouseholdMembers = await HouseholdModel.findOneAndUpdate( //find if household exists and adds into familymembers array
        { _id: response.houseId },
        { $push: { familyMembers: response.id } },
      )
      if (updateHouseholdMembers) {
        return new MemberResponse(
          'New family member added successfully',
          response,
        )
      } else {
        return new NotFoundError('Error: No valid household found')
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestError('New member not created successfully')
    }
  }
}
