import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PropertyTypeEnum } from 'src/common/constants/appartment-type.enum';
import { UnitApiPropConfig } from '../utils/swagger';
export class UnitCreateDto {
  @ApiProperty(UnitApiPropConfig.type)
  @IsNotEmpty()
  @IsEnum(PropertyTypeEnum)
  readonly type: PropertyTypeEnum;

  @ApiProperty(UnitApiPropConfig.pricePerSquareMeter)
  @IsNumber()
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
  @IsNotEmpty()
  @IsString()
  readonly propertyId: string;
}
