import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schema/event.schema';
import { LoggerModule } from '../../tools/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'events', schema: EventSchema }]),
    LoggerModule,
  ],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
