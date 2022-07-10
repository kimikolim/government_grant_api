import { string } from "joi";
import { SchemaType } from "mongoose";
import { HousingType, IHouse } from "../models/houseModel";

class House {
    id: string
    housingType: HousingType
    familyMembers: SchemaType<any>
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
        this.message = this.message
        this.house = new House(house)
    }
}

export class HouseholdListResponse {
    message: string
    houses: House[]
    constructor(message: string, houses: IHouse[]){
        this.message = message
        this.houses = []
        houses.map((home)=> this.houses.push(new House(home)))
    }
}