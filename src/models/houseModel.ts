import { Schema, model } from 'mongoose'
import { IMemberDetails } from './memberModel'

export enum HousingType {
    LANDED = "LANDED",
    CONDOMINIUM = "CONDOMINIUM",
    HDB = "HDB"
}

export interface IHouse {
    id?: string
    housingType: HousingType
    familyMembers: IMemberDetails[]
}