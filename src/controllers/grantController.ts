import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
  CurrentUser,
  BadRequestError,
  Params,
} from 'routing-controllers'
import { HouseholdModel, IHouse } from '../models/houseModel'
import { HouseholdService } from '../services/householdService'
import { householdValidator } from '../resources/householdValidation'

@JsonController('/api/v1')

/**
 * All Grants and Schemes
 */
export class GrantController {
  private mongoLookup = {
    '$lookup': {
      'from': 'members', 
      'localField': 'familyMembers', 
      'foreignField': '_id', 
      'as': 'familyMembers', 
      'pipeline': [
        {
          '$set': {
            'born': {
              '$dateFromString': {
                'dateString': '$DOB', 
                'format': '%d/%m/%Y'
              }
            },
            '_id' : { '$toString' : '$_id'},
          }
        }, {
          '$set': {
            'age': {
              '$divide': [
                {
                  '$subtract': [
                    '$$NOW', '$born'
                  ]
                }, 31536000000
              ]
            }
          }
        }
      ]
    }
  }

  @Get('/grant/student-encouragment-bonus')
  async getStudentEncouragementBonus() {
    const response = await HouseholdModel.aggregate(
      [
        this.mongoLookup, {
          '$set': {
            'totalIncome': {
              '$sum': '$familyMembers.annualIncome'
            }
          }
        }, {
          '$match': {
            '$and': [
              {
                'totalIncome': {
                  '$lt': 150000
                }
              }, {
                'familyMembers.age': {
                  '$lt': 16
                }
              }
            ]
          }
        }, {
          '$set': {
            '_id' : { '$toString' : '$_id'},
            'familyMembers': {
              '$filter': {
                'input': '$familyMembers', 
                'as': 'member', 
                'cond': {
                  '$lt': [
                    '$$member.age', 16
                  ]
                }
              }
            }
          }
        }
      ]
    )
    return response
  }

  @Get('/grant/family-togetherness-scheme')
  async getFamilyTogethernessScheme() {
    const response = HouseholdModel.aggregate([
      this.mongoLookup, {
        '$match': {
          '$and': [
            {
              'familyMembers.maritalStatus': 'MARRIED'
            }, {
              'familyMembers.age': {
                '$lt': 18
              }
            }
          ]
        }
      }, {
        '$set': {
          '_id' : { '$toString' : '$_id'}, 
          'familyMembers': {
            '$filter': {
              'input': '$familyMembers', 
              'as': 'member', 
              'cond': {
                '$lt': [
                  '$$member.age', 18
                ]
              }
            }
          }
        }
      }
    ])
    return response
  }

  @Get('/grant/elder-bonus')
  async getElderBonus() {
    const response = HouseholdModel.aggregate(
      [
        this.mongoLookup, {
          '$match': {
            'familyMembers.age': {
              '$gt': 50
            }
          }
        }, {
          '$set': {
            '_id': {
              '$toString': '$_id'
            }, 
            'familyMembers': {
              '$filter': {
                'input': '$familyMembers', 
                'as': 'member', 
                'cond': {
                  '$gt': [
                    '$$member.age', 50
                  ]
                }
              }
            }
          }
        }
      ]
    )
    return response
  }

  @Get('/grant/baby-sunshine-grant')
  async getBabySunshineGrant() {
    const response = HouseholdModel.aggregate(
      [
        this.mongoLookup, {
          '$match': {
            'familyMembers.age': {
              '$lt': 5
            }
          }
        }, {
          '$set': {
            '_id': {
              '$toString': '$_id'
            }, 
            'familyMembers': {
              '$filter': {
                'input': '$familyMembers', 
                'as': 'member', 
                'cond': {
                  '$lt': [
                    '$$member.age', 5
                  ]
                }
              }
            }
          }
        }
      ]
    )
    return response
  }

  @Get('/grant/yolo-gst-grant')
  async getYoloGstGrant() {}
}
