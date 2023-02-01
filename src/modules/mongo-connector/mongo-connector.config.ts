import { Expose, Transform, TransformFnParams } from 'class-transformer'
import { IsBoolean, IsString } from 'class-validator'

export class MongoConnectorConfig {
  @Expose()
  @IsString()
  readonly MONGO_URL: string

  @Expose()
  @IsBoolean()
  @Transform(({ value }: TransformFnParams): boolean => value === 'true')
  readonly MONGO_AUTO_INDEX: boolean

  @Expose()
  @IsBoolean()
  @Transform(({ value }: TransformFnParams): boolean => value === 'true')
  readonly MONGOOSE_DEBUG_ENABLED: boolean
}

export const dataSourceConnectionName: string = 'DATA_SOURCE_MONGO'
