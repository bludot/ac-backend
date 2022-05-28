import { Injectable } from '@nestjs/common'
import axios from 'axios'
import * as queryString from 'query-string'
import { ConfigService } from '../config/config.service'
import { ACConfig } from './ac.config'
import { IACData, IRoomConditions } from "./interfaces";

@Injectable()
export class ACService {
  private adData: IACData
  constructor(private readonly config: ConfigService<ACConfig>) {
    this.adData = {
      "power": 0,
      "temp": 24,
      "mode": 0,
      "fan": 10,
      "powerful": 0,
      "quiet": 1,
      "swingh": 1,
      "swingv": 1
    }
  }

  async updateAC(data: IACData): Promise<void> {
    const query: string = queryString.stringify(data)

    await axios.post(`${this.config.env.AC_URL}/cmd?${query}`).catch((error) => {
      console.error(error)
    })

    return this.saveState(data)
  }

  async getRoomConditions(): Promise<IRoomConditions> {
    const { data } = await axios.get(`${this.config.env.AC_URL}/roomconditions`)

    return {
      tempC: data.tempC,
      tempF: data.tempF,
      humidity: data.humidity,
    }

  }
  saveState(data: IACData): void {
    this.adData = data
  }

  getState(): IACData {
    return this.adData
  }

}
