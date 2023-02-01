import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, UpdateQuery, FilterQuery, QueryOptions } from 'mongoose'
import { IRoomConditions } from '../interfaces'
import { RoomConditions } from './roomconditions.schema'

@Injectable()
export class RoomConditionsRepository {

  private readonly findAndModifyOpts: QueryOptions = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  }

  constructor(@InjectModel(RoomConditions.name) private model: Model<RoomConditions>) {}

  public async upsert(data: Partial<RoomConditions>): Promise<IRoomConditions> {

    const roomCondition: RoomConditions = await this.model.create(data)
    const createdRoomCondition = roomCondition.toJSON()
    return {
      tempC: createdRoomCondition.tempC,
      tempF: createdRoomCondition.tempF,
      humidity: createdRoomCondition.humidity
    }
  }
}
