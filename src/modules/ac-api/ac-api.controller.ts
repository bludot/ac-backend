import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ACService } from '../ac/ac.service'
import { ACData } from './ac.dto'

@Controller()
export class AcApiController {
  constructor(private readonly acService: ACService) {}

  @Post('/cmd')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Sign in with username/password (with/without otp)',
  })
  async updateAC(@Body() body: ACData) {
    await this.acService.updateAC(body)
  }
}
