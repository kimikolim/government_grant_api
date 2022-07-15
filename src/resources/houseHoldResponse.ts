import { ObjectId } from 'mongoose'
import { HousingType, IHouse } from '../models/houseModel'
import { IMemberDetails } from '../models/memberModel'
import { Member } from './memberResponse'
class House {
  id: string | ObjectId
  housingType: HousingType
  totalIncome?: number
  familyMembers: Member[]
  constructor(household: IHouse) {
    this.id = household.id ?? ''
    this.housingType = household.housingType
    this.totalIncome = household.totalIncome
    this.familyMembers = household.familyMembers.map(
      (m: IMemberDetails) => new Member(m),
    )
  }
}

export class HouseResponse {
  message: string
  house: House
  constructor(message: string, house: IHouse) {
    this.message = message
    this.house = new House(house)
  }
}

export class HouseholdListResponse {
  message: string
  houses: House[]
  constructor(message: string, houses: IHouse[]) {
    this.message = message
    this.houses = houses.map((home: IHouse) => new House(home))
  }
}
