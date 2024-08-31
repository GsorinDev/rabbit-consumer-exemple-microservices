import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { EventService } from '../event/event.service';
import { NameEnumType } from '../event/enums/nameEnumType.enum';
import { ProcessEnumType } from '../event/enums/processEnumType.enum';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class WebscrapService {
  logger = new LoggerService(WebscrapService.name);

  constructor(private readonly eventService: EventService) {}

  @RabbitSubscribe({
    exchange: 'web-watcher',
    routingKey: 'web-watcher-publish',
    queue: 'service-webscrapping-queue',
  })
  async onWebscrapping(message: string): Promise<void> {
    this.logger.log(`Received message: ${message}`);
    await this.eventService.createEvent({
      name: NameEnumType.PUBLISH_DOCUMENT,
      process_type: ProcessEnumType.PROCESS,
    });
  }
}
