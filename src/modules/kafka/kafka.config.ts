import { Expose, Transform, TransformFnParams } from 'class-transformer'
import { IsArray, IsString  } from 'class-validator'

export class KafkaConfig {
  @IsArray()
  @Expose()
  @Transform(({ value }: TransformFnParams): string[] =>
    value !== undefined ? value.split(',') : undefined,
  )
  readonly KAFKA_BROKERS: string[]

  @IsArray()
  @Expose()
  @Transform(({ value }: TransformFnParams): string[] =>
    value !== undefined ? value.split(',') : undefined,
  )
  readonly KAFKA_TOPICS: string[]

  @IsString()
  @Expose()
  readonly KAFKA_CLIENT_ID: string

  @IsString()
  @Expose()
  readonly KAFKA_GROUP_ID: string
}