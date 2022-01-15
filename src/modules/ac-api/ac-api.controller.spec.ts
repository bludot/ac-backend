import { Test } from '@nestjs/testing'
import axios from 'axios'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { ConfigModule } from '../config/config.module'
import { ACModule } from '../ac/ac.module'
import { ACService } from './../ac/ac.service'
import { IACData } from './../ac/interfaces'
import { ACConfig } from './../ac/ac.config'
import { AcApiController } from './ac-api.controller'

jest.mock('axios')
describe('ACService', () => {
  let app: INestApplication
  let acService: ACService
  beforeEach(
    async (): Promise<void> => {
      // tslint:disable-next-line:typedef
      const moduleRef = await Test.createTestingModule({
        imports: [
          ConfigModule.register(ACConfig, { envFile: 'env.test.env' }),
          ACModule,
        ],
        controllers: [AcApiController],
      }).compile()

      acService = moduleRef.get<ACService>(ACService)

      app = moduleRef.createNestApplication()
      app.useGlobalPipes(new ValidationPipe())
      await app.init()
    },
  )
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('updateAC', () => {
    // eslint-disable-next-line jest/expect-expect
    it('should update AC', () => {
      axios.post = jest.fn().mockResolvedValue({ data: { data: { power: 1 } } })
      return request(app.getHttpServer())
        .post('/cmd')
        .send({
          power: 1,
          temp: 0,
          mode: 0,
          fan: 0,
          powerful: 0,
          quiet: 0,
          swingh: 0,
          swingv: 0,
        })
        .expect(200)
    })
    // eslint-disable-next-line jest/expect-expect
    it('Should return bad request', () => {
      axios.post = jest.fn().mockResolvedValue({ data: { data: { power: 1 } } })
      return request(app.getHttpServer())
        .post('/cmd')
        .send({
          power: 'ON',
          temp: 0,
          mode: 0,
          fan: 0,
          powerful: 0,
          quiet: 0,
          swingh: 0,
          swingv: 0,
        })
        .expect(400)
    })
  })
})
