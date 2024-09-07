import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { NotEmptyStrings } from '../decorator/NotEmptyStrings.decorator';

export class UpdateThemeDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @NotEmptyStrings()
  keywords: string[];
}
