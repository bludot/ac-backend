import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { ACService } from './ac.service'
import { ACConfig } from './ac.config'
import { MQTTModule } from '../mqtt/mqtt.module'

@Module({
  imports: [ConfigModule.register(ACConfig), MQTTModule],
  providers: [ACService],
  exports: [ACService],
})
export class ACModule {}
