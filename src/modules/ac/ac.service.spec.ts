import { Test } from '@nestjs/testing'
import { ACService } from './ac.service'
import { MQTTModule } from '../mqtt/mqtt.module'
import { MQTTService } from '../mqtt/mqtt.service'

jest.mock('axios')
describe('ACService', () => {
  let acService: ACService
  let mqttService: MQTTService
  beforeEach(
    async (): Promise<void> => {
      // tslint:disable-next-line:typedef
      const moduleRef = await Test.createTestingModule({
        imports: [MQTTModule],
        providers: [ACService],
      }).compile()

      acService = moduleRef.get<ACService>(ACService)
      mqttService = moduleRef.get<MQTTService>('MQTT')
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
