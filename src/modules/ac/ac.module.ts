import { Module } from '@nestjs/common'
import { ACService } from './ac.service'
import { MQTTModule } from '../mqtt/mqtt.module'
import { MongooseModule } from '@nestjs/mongoose'
import {  roomConditionsDefinition } from './repository/roomconditions.schema'
import { dataSourceConnectionName } from '../mongo-connector/mongo-connector.config'
import { RoomConditionsRepository } from './repository/roomconditions.repository'

@Module({
  imports: [
    MongooseModule.forFeature([roomConditionsDefinition], dataSourceConnectionName),
    MQTTModule
  ],
  providers: [RoomConditionsRepository, ACService],
  exports: [ACService],
})
export class ACModule { }
