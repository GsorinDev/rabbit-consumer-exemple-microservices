import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FluxRss, FluxRssSchema } from './fluxRss.schema';
import { v4 as uuidv4 } from 'uuid';

export type ThemeDocument = Theme & Document;

@Schema({ timestamps: true })
export class Theme {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [FluxRssSchema], required: true })
  flux_rss_list: FluxRss[];

  @Prop({ required: true })
  keywords: string[];
}
export const ThemeSchema = SchemaFactory.createForClass(Theme);
