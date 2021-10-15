import { Injectable } from '@nestjs/common'
import axios from 'axios'
import * as queryString from 'query-string'
import { ConfigService } from '../config/config.service'
import { ACConfig } from './ac.config'
import { IACData } from './interfaces'

@Injectable()
export class ACService {
  constructor(private readonly config: ConfigService<ACConfig>) {}

  updateAC(data: IACData) {
    const query: string = queryString.stringify(data)

    axios.post(`${this.config.env.AC_URL}?${query}`).catch((error) => {
      console.error(error)
    })
  }
}
