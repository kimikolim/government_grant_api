import moment from 'moment'
import { Mixed } from 'mongoose'
import {
  IMemberDetails,
  MaritalStatus,
  OccupationType,
} from '../models/memberModel'

export class Member {
  id: string
  houseId: string | Mixed
  name: string
  gender: string
  maritalStatus: MaritalStatus
  spouse: string
  occupationType: OccupationType
  annualIncome: number
  DOB: string
  age: number
  constructor(member: IMemberDetails) {
    this.id = member.id ?? ''
    this.houseId = member.houseId ?? ''
    this.name = member.name
    this.gender = member.gender
    this.maritalStatus = member.maritalStatus
    this.spouse = member.spouse
    this.occupationType = member.occupationType
    this.annualIncome = member.annualIncome
    this.DOB = member.DOB // DD/MM/YYYY
    this.age = moment().diff(moment(member.DOB, 'DD/MM/YYYY'), 'years')
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
