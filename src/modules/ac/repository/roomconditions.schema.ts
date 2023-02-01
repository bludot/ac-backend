import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

@Schema({ collection: 'roomconditions' })
export class RoomConditions extends Document {

  @Prop({ type: Number, required: true })
  readonly tempC: number

  @Prop({ type: Number, required: true })
  readonly tempF: number

  @Prop({ type: Number, required: true })
  readonly humidity: number

  @Prop({ type: Date, required: true, default: Date.now })
  readonly createdAt: Date

  @Prop({ type: Date, required: true, default: Date.now })
  readonly updatedAt: Date


}

const schema: MongooseSchema<RoomConditions> = SchemaFactory.createForClass(RoomConditions)

export const roomConditionsDefinition: ModelDefinition = { schema, name: RoomConditions.name }
