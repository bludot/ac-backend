import { Expose, Transform, TransformFnParams } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

export class MQTTConfig {
  @Expose()
  @IsString()
  readonly MQTT_HOST: string

  @Expose()
  @IsNumber()
  @Transform(({ value }: TransformFnParams): number =>
    value !== undefined ? Number(value) : undefined,
  )
  readonly MQTT_PORT: number

  @Expose()
  @IsString()
  readonly MQTT_USERNAME: string

  @Expose()
  @IsString()
  readonly MQTT_PASSWORD: string
}
