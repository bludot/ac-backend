import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, QueryOptions } from 'mongoose'
import { dataSourceConnectionName } from '../../mongo-connector/mongo-connector.config'
import { IRoomConditions } from './interfaces'
import { RoomConditions } from './roomconditions.schema'

@Injectable()
export class RoomConditionsRepository {

  private readonly findAndModifyOpts: QueryOptions = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  }

  constructor(@InjectModel(RoomConditions.name, dataSourceConnectionName) private model: Model<RoomConditions>) {}

  public async upsert(data: Partial<RoomConditions>): Promise<IRoomConditions> {
    console.log("doing it")
    const roomCondition: RoomConditions = await this.model.create({...data, updatedAt: new Date()})
    const createdRoomCondition = roomCondition.toJSON()
    return {
      tempC: createdRoomCondition.tempC,
      tempF: createdRoomCondition.tempF,
      humidity: createdRoomCondition.humidity
    }
  }

  public async getRoomConditions(): Promise<IRoomConditions[]> {
    return this.model.find().exec()
  }

  public async getRoomConditionsBetweenDates(startDate: Date, endDate: Date): Promise<IRoomConditions[]> {
    return this.model.find({ createdAt: { $gte: startDate, $lte: endDate } }).exec()
  }
    
}
