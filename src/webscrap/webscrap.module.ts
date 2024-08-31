import { Module } from '@nestjs/common';
import { WebscrapService } from './webscrap.service';
import { EventModule } from '../event/event.module';

@Module({
  imports: [EventModule],
  providers: [WebscrapService],
  exports: [WebscrapService],
})
export class WebscrapModule {}
