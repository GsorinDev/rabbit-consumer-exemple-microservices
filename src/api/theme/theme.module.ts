import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeSchema } from './schema/theme.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'theme', schema: ThemeSchema }]),
  ],
  providers: [ThemeService],
  controllers: [ThemeController],
})
export class ThemeModule {}
