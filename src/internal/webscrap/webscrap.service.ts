import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../tools/logger/logger.service';
import { EventService } from '../event/event.service';
import { NameEnumType } from '../event/enums/nameEnumType.enum';
import { ProcessEnumType } from '../event/enums/processEnumType.enum';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class WebscrapService {
  constructor(
    private readonly eventService: EventService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(WebscrapService.name);
  }

  @RabbitSubscribe({
    exchange: 'web-watcher',
    routingKey: 'web-watcher-publish',
    queue: 'service-webscrapping-queue',
  })
  async onWebscrapping(message: string): Promise<void> {
    this.loggerService.log(`Received message: ${message}`);
    await this.eventService.createEvent({
      name: NameEnumType.WEBSCRAPPING,
      process_type: ProcessEnumType.PROCESS,
    });
  }
}
