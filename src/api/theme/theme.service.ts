import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeDocument } from './schema/theme.schema';
import { CreateThemeDto } from './dto/createTheme.dto';
import { EventService } from '../../internal/event/event.service';
import { LoggerService } from '../../tools/logger/logger.service';
import { NameEnumType } from '../../internal/event/enums/nameEnumType.enum';
import { ProcessEnumType } from '../../internal/event/enums/processEnumType.enum';

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
}
