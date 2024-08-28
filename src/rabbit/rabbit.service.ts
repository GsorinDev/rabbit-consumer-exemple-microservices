import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import 'reflect-metadata';
import { RABBIT_CONSUMER_METADATA } from './rabbit-subscribe.decorator';
import { WebscrapService } from '../webscrap/webscrap.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RabbitService implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly logger = new LoggerService(RabbitService.name);

  async onModuleInit() {
    await this.connect();
    await this.setupConsumers();
  }

  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(
        `amqp://guest:guest@${process.env.NODE_ENV === 'local' ? 'localhost' : 'rabbitmq'}:5672`,
      ); // Changez cette URL si nécessaire
      this.channel = await this.connection.createChannel();
      this.logger.log('Connected to RabbitMQ and channel created');
    } catch (error) {
      this.logger.error('Error connecting to RabbitMQ', error);
    }
  }

  async createQueue(
    queueName: string,
    options?: amqp.Options.AssertQueue,
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not created. Call connect() first.');
    }
    await this.channel.assertQueue(queueName, options);
    this.logger.log(`Queue created: ${queueName}`);
  }

  async setupConsumers(): Promise<void> {
    const services = [WebscrapService];

    for (const service of services) {
      const subscribers =
        Reflect.getMetadata(RABBIT_CONSUMER_METADATA, service) || [];
      for (const { queue, queueOptions, methodName } of subscribers) {
        await this.createQueue(queue, queueOptions);

        this.channel.consume(queue, async (msg) => {
          if (msg !== null) {
            try {
              const message = msg.content.toString();
              const instance = new service();
              if (instance[methodName]) {
                await instance[methodName](message);
                this.channel.ack(msg);
              } else {
                this.logger.warn(
                  `Method ${methodName} not found in ${service.name}`,
                );
              }
            } catch (error) {
              this.logger.error('Error processing message', error);
            }
          }
        });
        this.logger.subscriber(
          `Consumer set up {"queue": "${queue}"}`,
          service.name,
        );
      }
    }
  }

  async publishMessage(queue: string, message: string): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel not created. Call connect() first.');
    }
    try {
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      this.logger.log(`Message sent to ${queue}: ${message}`);
    } catch (error) {
      this.logger.error(`Error publishing message to ${queue}`, error);
    }
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
