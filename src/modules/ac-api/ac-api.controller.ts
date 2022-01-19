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
}
