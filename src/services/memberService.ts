import { BadRequestError } from 'routing-controllers'
import { IMemberDetails, MembersModel } from '../models/memberModel'
import { MemberResponse } from '../resources/memberResponse'

export class MemberService {
  async createMemberByHousehold(houseId: string, member: IMemberDetails) {
    const { name, gender, maritalStatus, spouse, occupationType, annualIncome, DOB } = member
    const newMember = new MembersModel({
      houseId,
      name,
      gender,
      maritalStatus,
      spouse,
      occupationType,
      annualIncome,
      DOB
    })

    try {
      const response = await newMember.save() //writes to db
      return new MemberResponse('New family member added successfully', response)
    } catch (error) {
        console.log(error);
      throw new BadRequestError('New member not created successfully')
    }
  }
}
