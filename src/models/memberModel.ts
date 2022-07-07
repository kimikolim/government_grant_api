import { Schema, model } from 'mongoose'


export enum OccupationType {
    UNEMPLOYED = "UNEMPLOYED",
    STUDENT = "STUDENT",
    EMPLOYED = "EMPLOYED"
}

export interface IMemberDetails {
    id?: string
    houseId: string
    name: string
    gender: string
    spouse: string
    occupationType: OccupationType
    annualIncome: number
    DOB: Date
}


