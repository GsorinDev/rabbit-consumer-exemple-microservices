import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProcessEnumType } from '../enums/processEnumType.enum';
import { NameEnumType } from '../enums/nameEnumType.enum';

export type EventDocument = InternalEvent & Document;

@Schema({ timestamps: true })
export class InternalEvent {
  @Prop({ required: true })
  name: NameEnumType;

  @Prop({ required: true })
  process_type: ProcessEnumType;

  @Prop({ required: false })
  theme_id: string;
}
export const EventSchema = SchemaFactory.createForClass(InternalEvent);
