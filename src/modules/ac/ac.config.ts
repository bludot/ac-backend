import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

export class ACConfig {
  @Expose()
  @IsString()
  readonly AC_URL: string
}
