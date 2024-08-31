import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from './schema/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { LoggerService } from '../../tools/logger/logger.service';

@Injectable()
export class EventService {
  logger = new LoggerService(EventService.name);

  constructor(
    @InjectModel('events')
    private readonly eventModel: Model<EventDocument>,
  ) {}

  async createEvent(createEventData: CreateEventDto): Promise<EventDocument> {
    this.logger.log(
      'Creating event with data: ' + JSON.stringify(createEventData),
    );
    const createdEvent = new this.eventModel(createEventData);
    const savedEvent = await createdEvent.save();
    this.logger.log('Saved event: ' + JSON.stringify(savedEvent));
    return savedEvent;
  }
}
