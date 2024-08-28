import 'reflect-metadata';

export const RABBIT_CONSUMER_METADATA = 'RABBIT_CONSUMER_METADATA';

interface RabbitConsumerConfig {
  queue: string;
  queueOptions?: { durable?: boolean };
}

export function RabbitSubscribe(config: RabbitConsumerConfig) {
  return (target: any, propertyKey: string) => {
    const existingSubscribers =
      Reflect.getMetadata(RABBIT_CONSUMER_METADATA, target.constructor) || [];
    existingSubscribers.push({
      queue: config.queue,
      queueOptions: config.queueOptions,
      methodName: propertyKey,
    });
    Reflect.defineMetadata(
      RABBIT_CONSUMER_METADATA,
      existingSubscribers,
      target.constructor,
    );
  };
}
