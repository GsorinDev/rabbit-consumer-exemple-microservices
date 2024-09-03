import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeDocument } from './schema/theme.schema';
import { CreateThemeDto } from './dto/createTheme.dto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectModel('theme')
    private readonly themeModel: Model<ThemeDocument>,
  ) {}

  async create(themeCreateDto: CreateThemeDto): Promise<any> {
    const theme = new this.themeModel(themeCreateDto);
    return theme;
  }
}
