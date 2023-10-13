import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PropertyTypeEnum } from 'src/common/constants/property-type.enum';
import { UnitCreateDto } from './create.dto';
import { UnitApiPropConfig } from '../utils/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UnitUpdateDto extends PartialType(UnitCreateDto) {
  @ApiProperty(UnitApiPropConfig.type)
  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  readonly type?: PropertyTypeEnum;

  @ApiProperty(UnitApiPropConfig.pricePerSquareMeter)
  @IsOptional()
  readonly pricePerSquareMeter?: number;

  @ApiProperty(UnitApiPropConfig.numberOfRooms)
  @IsNumber()
  @IsOptional()
  readonly numberOfRooms?: number;

  @ApiProperty(UnitApiPropConfig.isAvailable)
  @IsBoolean()
  @IsOptional()
  readonly isAvailable?: boolean;

  @ApiProperty(UnitApiPropConfig.propertyId)
  @IsOptional()
  @IsString()
  readonly propertyId?: string;
}
