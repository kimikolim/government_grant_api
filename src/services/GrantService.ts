import { InternalServerError } from 'routing-controllers'
import { HouseholdModel } from '../models/houseModel'

import { HouseholdListResponse } from '../resources/houseHoldResponse'

export class GrantService {
  private mongoLookup = {
    $lookup: {
      from: 'members',
      localField: 'familyMembers',
      foreignField: '_id',
      as: 'familyMembers',
      pipeline: [
        {
          $set: {
            born: {
              $dateFromString: {
                dateString: '$DOB',
                format: '%d/%m/%Y',
              },
            },
            id: { $toString: '$_id' },
          },
        },
        {
          $set: {
            age: {
              $divide: [
                {
                  $subtract: ['$$NOW', '$born'],
                },
                31536000000,
              ],
            },
          },
        },
      ],
    },
  }

  private mongoSetTotalIncome = {
    $set: {
      totalIncome: {
        $sum: '$familyMembers.annualIncome',
      },
    },
  }

  /**
   * Household income < 150k
   * Age < 16
   */

  async getStudentEncouragementBonus() {
    try {
      const response = await HouseholdModel.aggregate([
        this.mongoLookup,
        this.mongoSetTotalIncome,
        {
          $match: {
            $and: [
              {
                totalIncome: {
                  $lt: 150000,
                },
              },
              {
                'familyMembers.age': {
                  $lt: 16,
                },
              },
            ],
          },
        },
        {
          $set: {
            id: { $toString: '$_id' },
            familyMembers: {
              $filter: {
                input: '$familyMembers',
                as: 'member',
                cond: {
                  $lt: ['$$member.age', 16],
                },
              },
            },
          },
        },
      ])
      // return response
      return new HouseholdListResponse('Student Encouragement Grant', response)
    } catch (error) {
      throw new InternalServerError('Error: Internal Server Error.')
    }
  }

  /**
   * Marital Status only MARRIED w spouse
   * Age < 18
   */

  async getFamilyTogethernessScheme() {
    try {
      const response = await HouseholdModel.aggregate([
        this.mongoLookup,
        {
          $match: {
            $and: [
              {
                familyMembers: {
                  $elemMatch: { maritalStatus: 'MARRIED', spouse: { $ne: '' } },
                },
              },
              {
                'familyMembers.age': {
                  $lt: 18,
                },
              },
            ],
          },
        },
        {
          $set: {
            id: { $toString: '$_id' },
            familyMembers: {
              $filter: {
                input: '$familyMembers',
                as: 'member',
                cond: {
                  $lt: ['$$member.age', 18],
                },
              },
            },
          },
        },
      ])
      return new HouseholdListResponse('Family Togetherness Scheme', response)
    } catch (error) {
      throw new InternalServerError('Error: Internal Server Error.')
    }
  }

  /**
   * Must be HDB only
   * Age > 50
   */

  async getElderBonus() {
    try {
      const response = await HouseholdModel.aggregate([
        this.mongoLookup,
        {
          $match: {
            $and: [
              {
                'familyMembers.age': {
                  $gt: 50,
                },
              },
              {
                housingType: 'HDB',
              },
            ],
          },
        },
        {
          $set: {
            id: {
              $toString: '$_id',
            },
            familyMembers: {
              $filter: {
                input: '$familyMembers',
                as: 'member',
                cond: {
                  $gt: ['$$member.age', 50],
                },
              },
            },
          },
        },
      ])
      return new HouseholdListResponse('Elder Bonus', response)
    } catch (error) {
      throw new InternalServerError('Error: Internal Server Error.')
    }
  }

  /**
   * Household with age < 5
   */

  async getBabySunshineGrant() {
    try {
      const response = await HouseholdModel.aggregate([
        this.mongoLookup,
        {
          $match: {
            'familyMembers.age': {
              $lt: 5,
            },
          },
        },
        {
          $set: {
            id: {
              $toString: '$_id',
            },
            familyMembers: {
              $filter: {
                input: '$familyMembers',
                as: 'member',
                cond: {
                  $lt: ['$$member.age', 5],
                },
              },
            },
          },
        },
      ])
      return new HouseholdListResponse('Baby Sunshine Grant', response)
    } catch (error) {
      throw new InternalServerError('Error: Internal Server Error.')
    }
  }

  /**
   * Household Annual Income < 100k
   * Must be HDB only
   */

  async getYoloGstGrant() {
    try {
      const response = await HouseholdModel.aggregate([
        this.mongoLookup,
        this.mongoSetTotalIncome,
        {
          $match: {
            $and: [
              {
                totalIncome: { $lt: 100000 },
              },
              {
                familyMembers: {
                  $exists: true,
                  $ne: [],
                },
              },
              {
                housingType: 'HDB',
              },
            ],
          },
        },
        {
          $set: {
            id: {
              $toString: '$_id',
            },
          },
        },
      ])
      return new HouseholdListResponse('YOLO GST Grant', response)
    } catch (error) {
      throw new InternalServerError('Error: Internal Server Error.')
    }
  }
}
