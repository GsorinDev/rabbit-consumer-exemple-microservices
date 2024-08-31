import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange_name',
          type: 'topic',
        },
      ],
      uri: `amqp://${process.env.NODE_ENV === 'local' ? 'localhost' : 'rabbitmq'}`,
    }),
  ],
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {}
