import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { fluxRssType } from '../enum/fluxRssType.enum';

export class UpdateFluxRssDto {
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source_name: string;

  @IsEnum(fluxRssType)
  @IsNotEmpty()
  @IsOptional()
  flux_rss_type: fluxRssType;
}
