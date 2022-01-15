import { Test } from '@nestjs/testing'
import axios from 'axios'
import { ConfigModule } from '../config/config.module'
import { ACService } from './ac.service'
import { IACData } from './interfaces'
import { ACConfig } from './ac.config'

jest.mock('axios')
describe('ACService', () => {
  let acService: ACService
  beforeEach(
    async (): Promise<void> => {
      // tslint:disable-next-line:typedef
      const moduleRef = await Test.createTestingModule({
        imports: [ConfigModule.register(ACConfig, { envFile: 'env.test.env' })],
        providers: [ACService],
      }).compile()

      acService = moduleRef.get<ACService>(ACService)
    },
  )
  describe('updateAC', () => {
    it('should update AC', async () => {
      axios.post = jest.fn().mockResolvedValue({ data: { data: { power: 1 } } })
      await acService.updateAC(({
        power: 'on',
      } as unknown) as IACData)
      expect(axios.post).toHaveBeenCalled()
      expect(axios.post).toHaveBeenCalledWith('http://bogus/cmd?power=on')
    })
  })
})
