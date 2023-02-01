import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from '../modules/config/config.service'
import { HealthcheckModule } from '../modules/healthcheck/healthcheck.module'
import { AcApiModule } from '../modules/ac-api/ac-api.module'
import { ServerConfig } from './server.config'
import { MQTTModule } from 'src/modules/mqtt/mqtt.module'
import { KafkaModule } from 'src/modules/kafka/kafka.module'
import { MongoConnectorModule } from 'src/modules/mongo-connector/mongo-connector.module'

@Module({
  imports: [HealthcheckModule, MongoConnectorModule, MQTTModule, KafkaModule],
})
export class ServerModule {
  static forRoot(config: ConfigService<ServerConfig>): DynamicModule {
    return {
      module: ServerModule,
      imports: [...(config ? [HealthcheckModule] : []), AcApiModule],
    }
  }
}
