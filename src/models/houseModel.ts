import mongoose, { Schema, model, Mixed } from 'mongoose'
// import { IMemberDetails } from './memberModel'

enum HousingType {
  LANDED = 'LANDED',
  CONDOMINIUM = 'CONDOMINIUM',
  HDB = 'HDB',
}
// 1. Create an interface representing household document in MongoDB.
interface IHouse {
  id?: string
  housingType: HousingType
  familyMembers: Mixed
}

// 2. Create a Schema corresponding to the household document interface.
const houseSchema = new Schema<IHouse>({
  housingType: { type: String, required: true, enum: HousingType },
  familyMembers: [{ ref: 'MembersModel', type: mongoose.Schema.Types.ObjectId }],
})

// 3. Create a Model.
const HouseholdModel = model<IHouse>('HouseholdModel', houseSchema)

export {HouseholdModel, IHouse, HousingType}