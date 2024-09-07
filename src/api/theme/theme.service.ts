import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeDocument } from './schema/theme.schema';
import { CreateThemeDto } from './dto/createTheme.dto';
import { EventService } from '../../internal/event/event.service';
import { LoggerService } from '../../tools/logger/logger.service';
import { NameEnumType } from '../../internal/event/enums/nameEnumType.enum';
import { ProcessEnumType } from '../../internal/event/enums/processEnumType.enum';
import { UpdateThemeDto } from './dto/updateTheme.dto';
import { UpdateFluxRssDto } from './dto/updateFluxRss.dto';
import { FluxRssDto } from './dto/fluxRss.dto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectModel('themes')
    private readonly themeModel: Model<ThemeDocument>,
    private readonly eventService: EventService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(ThemeService.name);
  }

  async create(themeCreateDto: CreateThemeDto): Promise<any> {
    const theme = new this.themeModel(themeCreateDto);

    this.loggerService.log(
      `generate new theme: ${JSON.stringify(themeCreateDto)}`,
    );

    await this.eventService.createEvent({
      name: NameEnumType.PUBLISH_THEME,
      process_type: ProcessEnumType.USER_ACTION,
      theme_id: theme._id,
    });

    return theme.save();
  }

  async deleteFluxRss(themeId: string, fluxRssId: string): Promise<any> {
    const theme = await this.themeModel.findOne({ _id: themeId });

    if (!theme) {
      throw new Error('Theme not found');
    }

    theme.flux_rss_list = theme.flux_rss_list.filter(
      (fluxRss) => fluxRss._id !== fluxRssId,
    );

    await theme.save();

    return theme;
  }

  async updateTheme(id: string, updateThemeDto: UpdateThemeDto) {
    this.loggerService.log(
      `Before update theme { id: ${id}, updateThemeDto: ${JSON.stringify(updateThemeDto)} }`,
    );
    const updated = await this.themeModel.findOneAndUpdate(
      { _id: id },
      updateThemeDto,
      { new: true },
    );
    this.loggerService.log(`After update theme ${updated}`);
    return updated;
  }

  async updateFluxRss(
    id: string,
    fluxRssId: string,
    updateFluxRssDto: UpdateFluxRssDto,
  ) {
    this.loggerService.log(
      `Before update theme { id: ${id}, fluxRssId: ${fluxRssId}, updateFluxRssDto: ${JSON.stringify(updateFluxRssDto)} }`,
    );

    const updateFields = Object.keys(updateFluxRssDto).reduce((acc, key) => {
      acc[`flux_rss_list.$.${key}`] = updateFluxRssDto[key];
      return acc;
    }, {});

    const updated = await this.themeModel.findOneAndUpdate(
      {
        _id: id,
        'flux_rss_list._id': fluxRssId,
      },
      {
        $set: updateFields,
      },
      { new: true },
    );

    this.loggerService.log(`After update theme ${updated}`);
    return updated;
  }

  async addFluxRss(id: string, fluxRssDto: FluxRssDto) {
    this.loggerService.log(
      `Before update theme { id: ${id}, addFluxRss: ${JSON.stringify(fluxRssDto)} }`,
    );

    const updated = await this.themeModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: { flux_rss_list: fluxRssDto },
      },
      { new: true },
    );

    this.loggerService.log(`After update theme ${updated}`);
    return updated;
  }
}
