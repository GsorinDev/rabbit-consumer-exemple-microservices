import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/createTheme.dto';
import { LoggerService } from '../../tools/logger/logger.service';
import { AppController } from '../../app.controller';
import { UpdateThemeDto } from './dto/updateTheme.dto';
import { UpdateFluxRssDto } from './dto/updateFluxRss.dto';
import { FluxRss } from './schema/fluxRss.schema';
import { FluxRssDto } from './dto/fluxRss.dto';

@Controller('theme')
export class ThemeController {
  constructor(
    private readonly themeService: ThemeService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(AppController.name);
  }

  @Post()
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

  @Put(':id')
  async updateTheme(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateThemeDto: UpdateThemeDto,
  ): Promise<any> {
    try {
      return this.themeService.updateTheme(id, updateThemeDto);
    } catch (e) {
      this.loggerService.error(e.message, e.stack);
    }
  }

  @Put(':id/update-flux-rss/:id_rss')
  async updateFluxRss(
    @Param('id') id: string,
    @Param('id_rss') id_rss: string,
    @Body(new ValidationPipe()) updateFluxRssDto: UpdateFluxRssDto,
  ): Promise<any> {
    try {
      return this.themeService.updateFluxRss(id, id_rss, updateFluxRssDto);
    } catch (e) {
      this.loggerService.error(e.message, e.stack);
    }
  }

  @Put(':id/add-flux-rss')
  async addFluxRss(
    @Param('id') id: string,
    @Body(new ValidationPipe()) addFluxRss: FluxRssDto,
  ): Promise<any> {
    try {
      return this.themeService.addFluxRss(id, addFluxRss);
    } catch (e) {
      this.loggerService.error(e.message, e.stack);
    }
  }
}
