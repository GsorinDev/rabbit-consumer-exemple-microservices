import { Module } from '@nestjs/common';
import { WebscrapService } from './webscrap.service';
import { EventModule } from '../event/event.module';
import { LoggerModule } from '../../tools/logger/logger.module';

@Module({
  imports: [EventModule, LoggerModule],
  providers: [WebscrapService],
  exports: [WebscrapService],
})
export class WebscrapModule {}
