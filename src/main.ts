import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitService } from './rabbit/rabbit.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot());

  const rabbitService = app.get(RabbitService);
  await rabbitService.connect();

  await app.listen(3000);
}
bootstrap();
