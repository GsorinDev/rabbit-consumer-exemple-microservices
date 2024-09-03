import {
  IsString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FluxRssDto } from './fluxRss.dto';
import { IsUniqueFluxRss } from '../decorator/isUniqueFluxRss.decorator';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FluxRssDto)
  @IsOptional()
  @IsUniqueFluxRss()
  flux_rss_list: FluxRssDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keywords: string[];
}
