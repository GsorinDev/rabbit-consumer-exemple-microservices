import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishMessage(exchange: string, routing_key: string, message: string) {
    await this.amqpConnection.publish(exchange, routing_key, {
      message,
    });
  }
}
