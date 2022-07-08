import { SchemaType } from "mongoose";
import { HousingType, IHouse } from "../models/houseModel";

class House {
    id: string
    housingType: HousingType
    familyMembers: SchemaType<any>
    constructor(household: IHouse) {
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