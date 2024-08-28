import { Module } from '@nestjs/common';
import { WebscrapService } from './webscrap.service';
import { RabbitModule } from '../rabbit/rabbit.module';

@Module({
  imports: [RabbitModule],
  providers: [WebscrapService],
})
export class WebscrapModule {}
