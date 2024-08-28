import { Body, Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitService } from './rabbit/rabbit.service';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  logger = new LoggerService(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly rabbitService: RabbitService,
  ) {}

  @Get('publish')
  async publishMessage(@Body() message: any): Promise<any> {
    await this.rabbitService.publishMessage(
      'service-webscrapping-queue',
      message,
    );
    this.logger.log(`Received message: ${message}`);
  }
}
