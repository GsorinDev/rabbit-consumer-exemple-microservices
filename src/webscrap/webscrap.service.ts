import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitService } from '../rabbit/rabbit.service';
import { LoggerService } from '../logger/logger.service';
import { RabbitSubscribe } from '../rabbit/rabbit-subscribe.decorator';

@Injectable()
export class WebscrapService {
  logger = new LoggerService(WebscrapService.name);

  @RabbitSubscribe({
    queue: 'service-webscrapping-queue',
    queueOptions: { durable: true },
  })
  async onWebscrapping(message: string): Promise<void> {
    this.logger.log(`Received message: ${message}`);
  }
}
