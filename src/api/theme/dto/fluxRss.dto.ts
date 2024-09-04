import { IsString, IsNotEmpty, IsUrl, IsEnum, IsDate } from 'class-validator';
import { fluxRssType } from '../enum/fluxRssType.enum';
import { Type } from 'class-transformer';

export class FluxRssDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  source_name: string;

  @IsEnum(fluxRssType)
  @IsNotEmpty()
  flux_rss_type: fluxRssType;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  checking_date: Date;
}
