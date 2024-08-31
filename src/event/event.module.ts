import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schema/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'events', schema: EventSchema }]),
  ],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
