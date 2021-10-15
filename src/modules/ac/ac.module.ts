import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { ACService } from './ac.service'
import { ACConfig } from './ac.config'

@Module({
  imports: [ConfigModule.register(ACConfig)],
  providers: [ACService],
  exports: [ACService],
})
export class ACModule {}
