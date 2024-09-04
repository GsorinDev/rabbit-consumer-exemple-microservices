import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from './schema/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { LoggerService } from '../../tools/logger/logger.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('events')
    private readonly eventModel: Model<EventDocument>,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(EventService.name);
  }

  async createEvent(createEventData: CreateEventDto): Promise<EventDocument> {
    this.loggerService.log(
      'Creating event with data: ' + JSON.stringify(createEventData),
    );
    const createdEvent = new this.eventModel(createEventData);
    const savedEvent = await createdEvent.save();
    this.loggerService.log('Saved event: ' + JSON.stringify(savedEvent));
    return savedEvent;
  }
}
