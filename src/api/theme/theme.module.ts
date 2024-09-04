import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeSchema } from './schema/theme.schema';
import { LoggerModule } from '../../tools/logger/logger.module';
import { EventModule } from '../../internal/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'themes', schema: ThemeSchema }]),
    LoggerModule,
    EventModule,
  ],
  providers: [ThemeService],
  controllers: [ThemeController],
})
export class ThemeModule {}
