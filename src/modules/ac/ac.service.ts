import { Inject, Injectable } from '@nestjs/common'
import * as queryString from 'query-string'
import { MQTTService } from '../mqtt/mqtt.service'
import { IACData, IRoomConditions } from "./interfaces";
import { RoomConditionsRepository } from './repository/roomconditions.repository'

@Injectable()
export class ACService {
  private acData: IACData
  private roomConditions: IRoomConditions
  constructor(
    @Inject('MQTT')
    private readonly mqttService: MQTTService,
    private readonly roomConditionsRepository: RoomConditionsRepository,
    ) {
    this.acData = {
      "power": 0,
      "temp": 24,
      "mode": 0,
      "fan": 10,
      "powerful": 0,
      "quiet": 1,
      "swingh": 1,
      "swingv": 1
    }
    this.roomConditions = {
      tempC: 0,
      tempF: 0,
      humidity: 0
    }
  }

  async updateAC(data: IACData): Promise<void> {
    const query: string = queryString.stringify(data)
    this.mqttService.publish('ac', JSON.stringify(data))

    return this.saveState(data)
  }

  
  saveState(data: IACData): void {
    this.acData = data
  }

  getState(): IACData {
    return this.acData
  }

  setRoomConditions(data: IRoomConditions): void {
    this.roomConditions = data
    this.roomConditionsRepository.upsert(data)
  }

  getRoomConditions(): IRoomConditions {
    return this.roomConditions
  }

}
