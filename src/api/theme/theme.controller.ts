import { Body, Controller, Get, ValidationPipe } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/createTheme.dto';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  async createTheme(
    @Body(new ValidationPipe()) createThemeDto: CreateThemeDto,
  ): Promise<void> {
    return this.themeService.create(createThemeDto);
  }
}
