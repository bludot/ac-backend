// import { Test } from '@nestjs/testing'
// import axios from 'axios'
// import { INestApplication, ValidationPipe } from '@nestjs/common'
// import * as request from 'supertest'
// import { ACModule } from '../ac/ac.module'
// import { ACService } from './../ac/ac.service'
// import { AcApiController } from './ac-api.controller'
// import { RoomConditionsRepository } from '../ac/repository/roomconditions.repository'
// import { MongooseModule } from '@nestjs/mongoose'
// import { ConfigModule } from '../config/config.module'
// import { ConfigService } from '../config/config.service'
// import { dataSourceConnectionName, MongoConnectorConfig } from '../mongo-connector/mongo-connector.config'
// import { roomConditionsDefinition } from '../ac/repository/roomconditions.schema'

// jest.mock('axios')
// describe('ACService', () => {
//   let app: INestApplication
//   let acService: ACService
//   beforeEach(
//     async (): Promise<void> => {
//       // tslint:disable-next-line:typedef
//       const moduleRef = await Test.createTestingModule({
//         imports: [
//           MongooseModule.forRootAsync({
//             connectionName: dataSourceConnectionName,
//             imports: [
//               ConfigModule.register(MongoConnectorConfig, {
//                 envFile: 'env.test.env'
//               })
//             ],
//             useFactory: async (config: ConfigService<MongoConnectorConfig>): Promise<{ readonly uri: string }> => {
//               const uri: string = config.env.MONGO_URL

//               return {
//                 uri
//               }
//             },
//             inject: [ConfigService]
//           }),
//           MongooseModule.forFeature([roomConditionsDefinition], dataSourceConnectionName),
//           ACModule,
//         ],
//         controllers: [AcApiController],
//         providers: [RoomConditionsRepository],
        
//       }).compile()

//       acService = moduleRef.get<ACService>(ACService)

//       app = moduleRef.createNestApplication()
//       app.useGlobalPipes(new ValidationPipe())
//       await app.init()
//     },
//   )
//   afterEach(() => {
//     jest.clearAllMocks()
//   })
//   describe('updateAC', () => {
//     // eslint-disable-next-line jest/expect-expect
//     it('should update AC', () => {
//       axios.post = jest.fn().mockResolvedValue({ data: { data: { power: 1 } } })
//       return request(app.getHttpServer())
//         .post('/cmd')
//         .send({
//           power: 1,
//           temp: 0,
//           mode: 0,
//           fan: 0,
//           powerful: 0,
//           quiet: 0,
//           swingh: 0,
//           swingv: 0,
//         })
//         .expect(200)
//     })
//     // eslint-disable-next-line jest/expect-expect
//     it('Should return bad request', async (done) => {
//       axios.post = jest.fn().mockResolvedValue({ data: { data: { power: 1 } } })
//       request(app.getHttpServer())
//         .post('/cmd')
//         .send({
//           power: 'ON',
//           temp: 0,
//           mode: 0,
//           fan: 0,
//           powerful: 0,
//           quiet: 0,
//           swingh: 0,
//           swingv: 0,
//         })
//         .expect(400)
//         .end((err) => {
//           if (err) return done(err)
//           done()
//         })
//     })
//   })
// })
