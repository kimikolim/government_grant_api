import { ObjectId } from 'mongoose'
import { HousingType, IHouse } from '../models/houseModel'
import { IMemberDetails } from '../models/memberModel'
import { Member } from './memberResponse'
class House {
  id: string | ObjectId
  housingType: HousingType
  familyMembers: any
  constructor(household: IHouse) {
    this.id = household.id ?? ''
    this.housingType = household.housingType
    this.familyMembers = household.familyMembers.map((m: any) => new Member(m))
  }
}

export class HouseResponse {
  message: string
  house: House
  constructor(message: string, house: any) {
    this.message = message
    this.house = new House(house)
  }
}

export class HouseholdListResponse {
  message: string
  houses: House[]
  constructor(message: string, houses: any) {
    this.message = message
    this.houses = []
    houses.map((home: any) => this.houses.push(new House(home)))
  }
}
