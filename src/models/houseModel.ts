import mongoose, { Schema, model, ObjectId } from 'mongoose'
import { IMemberDetails } from './memberModel'
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
  familyMembers: IMemberDetails[] | ObjectId
}

// 2. Create a Schema corresponding to the household document interface.
const houseSchema = new Schema<IHouse>({
  housingType: { type: String, required: true, enum: HousingType },
  familyMembers: [{ ref: 'Members', type: mongoose.Schema.Types.ObjectId }],
}, {
  toJSON: {
    virtuals: true,
    // getters: true,
    // minimize: false
  }
})

// 3. Create a Model.
const HouseholdModel = model<IHouse>('Household', houseSchema)

export {HouseholdModel, IHouse, HousingType}