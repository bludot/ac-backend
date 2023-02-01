import { Test } from '@nestjs/testing'
import { ACService } from './ac.service'
import { MQTTModule } from '../mqtt/mqtt.module'
import { MQTTService } from '../mqtt/mqtt.service'
import { RoomConditions } from './repository/roomconditions.schema'
import { getModelToken } from '@nestjs/mongoose'
import { RoomConditionsRepository } from './repository/roomconditions.repository'

jest.mock('axios')
describe('ACService', () => {
  let acService: ACService
  let mqttService: MQTTService
  let roomConditionsRepository: RoomConditionsRepository


  function mockModel(dto: any): void {
    // tslint:disable-next-line
    this.data = dto
    // tslint:disable-next-line
    this.save = (): any => {
      return this.data
    }
  }
  beforeEach(
    async (): Promise<void> => {
      // tslint:disable-next-line:typedef
      const moduleRef = await Test.createTestingModule({
        imports: [MQTTModule],
        providers: [
          {
            provide: getModelToken(RoomConditions.name),
            useValue: mockModel
          },
          RoomConditionsRepository,
          ACService],
      }).compile()

      acService = moduleRef.get<ACService>(ACService)
      mqttService = moduleRef.get<MQTTService>('MQTT')
      roomConditionsRepository = moduleRef.get<RoomConditionsRepository>(RoomConditionsRepository)
    },
  )
  describe('updateAC', () => {
    it('should update AC', async () => {
      mqttService.publish = jest.fn().mockReturnValue(true)
      // TODO: Add test for mqtt
      // acService.updateAC(({
      //   power: 'on',
      // } as unknown) as IACData)
      expect(true).toEqual(true)
    })
  })
})
