import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ACData {
  @ApiProperty()
  @IsNumber()
  readonly power: number

  @ApiProperty()
  @IsNumber()
  readonly temp: number

  @ApiProperty()
  @IsNumber()
  readonly mode: number

  @ApiProperty()
  @IsNumber()
  readonly fan: number

  @ApiProperty()
  @IsNumber()
  readonly powerful: number

  @ApiProperty()
  @IsNumber()
  readonly quiet: number

  @ApiProperty()
  @IsNumber()
  readonly swingh: number

  @ApiProperty()
  @IsNumber()
  readonly swingv: number
}
