import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PropertyTypeEnum } from 'src/common/constants/property-type.enum';
import { UnitApiPropConfig } from '../utils/swagger';
import { Property } from 'src/common/models/property.entity';
import { Type } from 'class-transformer';
export class UnitCreateDto {
  @ApiProperty(UnitApiPropConfig.type)
  @IsNotEmpty()
  @IsEnum(PropertyTypeEnum)
  readonly type: PropertyTypeEnum;

  @ApiProperty(UnitApiPropConfig.pricePerSquareMeter)
  @IsNotEmpty()
  readonly pricePerSquareMeter: number;

  @ApiProperty(UnitApiPropConfig.numberOfRooms)
  @IsNumber()
  @IsNotEmpty()
  readonly numberOfRooms: number;

  @ApiProperty(UnitApiPropConfig.isAvailable)
  @IsBoolean()
  @IsOptional()
  readonly isAvailable: boolean = true;

  @ApiProperty(UnitApiPropConfig.propertyId)
  @IsOptional()
  @IsString()
  readonly propertyId?: string;

  @ApiProperty(UnitApiPropConfig.property)
  @IsOptional()
  @Type(() => Property)
  readonly property?: Property;
}
