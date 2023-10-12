import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UnitCreateDto } from 'src/modules/unit/dto/create.dto';
import { PropertyApiPropConfig } from '../utils/swagger';
export class PropertyCreateDto {
  @ApiProperty(PropertyApiPropConfig.location)
  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @ApiProperty(PropertyApiPropConfig.unitsDto)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitCreateDto)
  units: UnitCreateDto[];
}
