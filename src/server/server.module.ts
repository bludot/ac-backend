import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from '../modules/config/config.service'
import { HealthcheckModule } from '../modules/healthcheck/healthcheck.module'
import { AcApiModule } from '../modules/ac-api/ac-api.module'
import { ServerConfig } from './server.config'
import { MQTTModule } from 'src/modules/mqtt/mqtt.module'

@Module({
  imports: [HealthcheckModule, MQTTModule],
})
export class ServerModule {
  static forRoot(config: ConfigService<ServerConfig>): DynamicModule {
    return {
      module: ServerModule,
      imports: [...(config ? [HealthcheckModule] : []), AcApiModule],
    }
  }
}
