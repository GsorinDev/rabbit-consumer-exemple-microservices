import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { fluxRssType } from '../enum/fluxRssType.enum';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class FluxRss {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  source_name: string;

  @Prop({ required: true })
  flux_rss_type: fluxRssType;

  @Prop({ required: true })
  checking_date: Date;
}

export const FluxRssSchema = SchemaFactory.createForClass(FluxRss);
