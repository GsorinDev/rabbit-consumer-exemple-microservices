import { Body, Controller, Get } from '@nestjs/common';
import { RabbitService } from './tools/rabbit/rabbit.service';

@Controller()
export class AppController {
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
