import { ObjectId, ObjectIdExpression } from "mongoose";
import { HousingType, IHouse } from "../models/houseModel";
import { IMemberDetails } from "../models/memberModel";
class House {
    id: string | ObjectId
    housingType: HousingType
    familyMembers: IMemberDetails[] | ObjectId
    constructor(household: IHouse) {
        this.id = household.id ?? ''
        this.housingType = household.housingType
        this.familyMembers = household.familyMembers
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
    constructor(message: string, houses: any){
        this.message = message
        this.houses = []
        houses.map((home: any)=> this.houses.push(new House(home)))
    }
}