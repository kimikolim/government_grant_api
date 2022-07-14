import mongoose from 'mongoose'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers'
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
      const updateHouseholdMembers = await HouseholdModel.findOneAndUpdate(
        //find if household exists and adds into familymembers array
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

  async deleteMemberById(houseId: string, id: string) {
    /**
     * Check for valid IDs provided
     */

    if (!mongoose.Types.ObjectId.isValid(houseId)) {
      return new BadRequestError('Invalid House ID')
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new BadRequestError('Invalid Member ID')
    }

    /**
     * Checks if Family Member & Househ exists
     */
    
    let memberSearch = null
    let houseSearch = null
    try {
      memberSearch = await MembersModel.find({ _id: id })
      houseSearch = await HouseholdModel.find({ _id: houseId })
    } catch (error) {
      return new InternalServerError(`${error}`)
    }
    if (!memberSearch.length) {
      return new NotFoundError('Error: No valid family member found.')
    }
    if (!houseSearch.length) {
      return new NotFoundError('Error: No valid household found.')
    }

    try {
      const response = await MembersModel.findByIdAndDelete(id)
      await HouseholdModel.findOneAndUpdate(
        { _id: houseId },
        {
          $pull: { familyMembers: id },
        },
        { returnDocument: true },
      )
      return new MemberResponse('Family Member successfully deleted', response!)
    } catch (error) {
      throw new BadRequestError('Delete Family Member failed.')
    }
  }
}
