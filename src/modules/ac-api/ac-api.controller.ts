import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ACService } from '../ac/ac.service'
import { ACData } from './ac.dto'

@Controller()
export class AcApiController {
  constructor(private readonly acService: ACService) {}

  @Post('/cmd')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Consume AC Request',
  })
  async updateAC(@Body() body: ACData) {
    await this.acService.updateAC(body)
  }

  @Get('/state')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get AC State',
  })
  async getState() {
    return this.acService.getState()
  }

  @Get('/roomconditions')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get Room Conditions',
  })
  async getRoomConditions() {
    return this.acService.getRoomConditions()
  }

  @Get('/roomconditions/history')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get Room Conditions History',
  })
  async getRoomConditionsHistory() {
    return this.acService.getRoomConditionsHistory()
  }

  @Post('/roomconditions/between')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get Room Conditions Between',
  })
  async getRoomConditionsBetween(
    @Body('from') from: string,
    @Body('to') to: string,
  ) {
    return this.acService.getRoomConditionsHistoryBetweenDates(new Date(from), new Date(to))
  }
}
