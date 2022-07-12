import mongoose, { Schema, model, Mixed } from 'mongoose'

export enum OccupationType {
  UNEMPLOYED = 'UNEMPLOYED',
  STUDENT = 'STUDENT',
  EMPLOYED = 'EMPLOYED',
}

export enum MaritalStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  DIVORCED = 'DIVORCED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

// 1. Create an interface representing household members document in MongoDB.
interface IMemberDetails {
  id?: string
  houseId: string | Mixed
  name: string
  gender: Gender
  maritalStatus: MaritalStatus
  spouse: string
  occupationType: OccupationType
  annualIncome: number
  DOB: string
}

// 2. Create a Schema corresponding to the household document interface.
const memberSchema = new Schema<IMemberDetails>(
  {
    houseId: { ref: 'Household', type: String, required: true },
    name: { type: String, require: true },
    gender: { type: String, required: true, enum: Gender },
    maritalStatus: { type: String, required: true, enum: MaritalStatus },
    spouse: { type: String },
    occupationType: { type: String, required: true, enum: OccupationType },
    annualIncome: { type: Number, required: true },
    DOB: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      // getters: true,
      // minimize: false
    },
  },
)

// 3. Create a Model.
const MembersModel = model<IMemberDetails>('Members', memberSchema)

export { IMemberDetails, MembersModel }
