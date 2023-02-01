import { Module } from '@nestjs/common'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'


import { dataSourceConnectionName, MongoConnectorConfig } from './mongo-connector.config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: dataSourceConnectionName,
      imports: [ConfigModule.register(MongoConnectorConfig)],
      useFactory: (config: ConfigService<MongoConnectorConfig>): MongooseModuleOptions => {
        const options: MongooseModuleOptions = {
          uri: config.env.MONGO_URL,
          autoIndex: config.env.MONGO_AUTO_INDEX
        }

        return options
      },
      inject: [ConfigService]
    })
  ]
})
export class MongoConnectorModule {}
