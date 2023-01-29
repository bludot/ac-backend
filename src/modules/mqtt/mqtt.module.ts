import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { MQTTConfig } from './mqtt.config'
import { MQTTService } from './mqtt.service'

const MQTTFactory = {
  provide: 'MQTT',
  imports: [ConfigModule.register(MQTTConfig)],
  useFactory: async (
    optionsProvider: ConfigService<MQTTConfig>,
  ) => {
    const mqttService = new MQTTService(
      optionsProvider,
    )
    await mqttService.connect()
    return mqttService
  },
  inject: [ConfigService],
}

@Module({
  imports: [ConfigModule.register(MQTTConfig)],
  providers: [MQTTFactory],
  exports: ['MQTT'],
})
export class MQTTModule {}