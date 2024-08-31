import { Body, Controller, Get, Logger } from '@nestjs/common';

import { LoggerService } from './logger/logger.service';
import { RabbitService } from './rabbit/rabbit.service';

@Controller()
export class AppController {
  logger = new LoggerService(AppController.name);

  constructor(private readonly rabbitService: RabbitService) {}

  @Get('publish')
  async publishMessage(@Body() message: any): Promise<any> {
    await this.rabbitService.publishMessage(
      'web-watcher',
      'web-watcher-publish',
      message,
    );
  }
}
