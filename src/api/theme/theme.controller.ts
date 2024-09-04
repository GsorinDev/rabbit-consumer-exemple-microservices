import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/createTheme.dto';
import { LoggerService } from '../../tools/logger/logger.service';
import { AppController } from '../../app.controller';

@Controller('theme')
export class ThemeController {
  constructor(
    private readonly themeService: ThemeService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(AppController.name);
  }

  @Get()
  async createTheme(
    @Body(new ValidationPipe()) createThemeDto: CreateThemeDto,
  ): Promise<void> {
    try {
      return this.themeService.create(createThemeDto);
    } catch (e) {
      this.loggerService.error(e.message, e.stack);
    }
  }

  @Delete(':id/delete-rss-flux/:rss_id')
  async deleteThemeFluxRss(
    @Param('id') id: string,
    @Param('rss_id') rss_id: string,
  ): Promise<void> {
    try {
      return this.themeService.deleteFluxRss(id, rss_id);
    } catch (e) {
      this.loggerService.error(e.message, e.stack);
    }
  }
}
