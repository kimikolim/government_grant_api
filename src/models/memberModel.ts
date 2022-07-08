import mongoose, { Schema, model, Mixed } from 'mongoose'

enum OccupationType {
  UNEMPLOYED = 'UNEMPLOYED',
  STUDENT = 'STUDENT',
  EMPLOYED = 'EMPLOYED',
}

enum MaritalStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  DIVORCED = 'DIVORCED',
}

// 1. Create an interface representing household members document in MongoDB.
interface IMemberDetails {
  id?: string
  houseId: string | Mixed
  name: string
  gender: string
  maritalStatus: MaritalStatus
  spouse: string
  occupationType: OccupationType
  annualIncome: number
  DOB: Date
}

// 2. Create a Schema corresponding to the household document interface.
const memberSchema = new Schema<IMemberDetails>({
  houseId: { type: String, required: true },
  name: { type: String, require: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true, enum: MaritalStatus },
  spouse: { type: String },
  occupationType: {type: String, required: true, enum: OccupationType},
  annualIncome: {type: Number, required: true},
  DOB: {type: Date, required: true},
})

// 3. Create a Model.
const Members = model<IMemberDetails>('Members', memberSchema)

export { OccupationType, IMemberDetails, Members }
