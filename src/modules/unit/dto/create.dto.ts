import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PropertyTypeEnum } from 'src/common/constants/appartment-type.enum';
export class UnitCreateDto {
  @ApiProperty({
    required: true,
    type: 'enum',
    description: 'type of the property',
    default: ' ',
    isArray: false,
    name: 'type',
  })
  @IsNotEmpty()
  @IsEnum(PropertyTypeEnum)
  readonly type: PropertyTypeEnum;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'price per square meter of the property',
    default: ' ',
    isArray: false,
    name: 'pricePerSquareMeter',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly pricePerSquareMeter: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'number of rooms of the property',
    default: ' ',
    isArray: false,
    name: 'numberOfRooms',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly numberOfRooms: number;

  @ApiProperty({
    required: false,
    type: 'boolean',
    description: 'availability of the property',
    default: ' ',
    isArray: false,
    name: 'isAvailable',
  })
  @IsBoolean()
  @IsOptional()
  readonly isAvailable: boolean = true;
}
