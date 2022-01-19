import { Injectable } from '@nestjs/common'
import axios from 'axios'
import * as queryString from 'query-string'
import { ConfigService } from '../config/config.service'
import { ACConfig } from './ac.config'
import { IACData } from './interfaces'

@Injectable()
export class ACService {
  private adData: IACData
  constructor(private readonly config: ConfigService<ACConfig>) {}

  async updateAC(data: IACData): Promise<void> {
    const query: string = queryString.stringify(data)

    await axios.post(`${this.config.env.AC_URL}?${query}`).catch((error) => {
      console.error(error)
    })
    
    return this.saveState(data)
  }

  saveState(data: IACData): void {
    this.adData = data
  }

  getState(): IACData {
    return this.adData
  }

}
