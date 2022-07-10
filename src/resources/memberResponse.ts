import { Mixed } from 'mongoose'
import { IMemberDetails, MaritalStatus, OccupationType } from '../models/memberModel'

class Member {
  id: string
  houseId: string | Mixed
  name: string
  gender: string
  maritalStatus: MaritalStatus
  spouse: string
  occupationType: OccupationType
  annualIncome: number
  DOB: string
  constructor(member: IMemberDetails) {
    this.id = member.id ?? ''
    this.houseId = member.houseId ?? ''
    this.gender = member.gender
    this.maritalStatus = member.maritalStatus
    this.spouse = member.spouse
    this.occupationType = member.occupationType
    this.annualIncome = member.annualIncome
    this.DOB = member.DOB
  }
}

export class MemberResponse {
  message: string
  member: Member
  constructor(message: string, member: IMemberDetails) {
    this.message = message
    this.member = new Member(member)
  }
}
