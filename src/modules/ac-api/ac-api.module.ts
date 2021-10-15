import { Module } from '@nestjs/common'
import { ACModule } from '../ac/ac.module'
import { AcApiController } from './ac-api.controller'

@Module({
  imports: [ACModule],
  controllers: [AcApiController],
})
export class AcApiModule {}
