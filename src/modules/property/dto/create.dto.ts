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
export class PropertyCreateDto {
  @ApiProperty({
    required: true,
    type: 'location',
    description: 'location of the property',
    default: ' ',
    isArray: false,
    name: 'location',
  })
  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @ApiProperty({
    required: true,
    type: () => UnitCreateDto,
    description: 'units of the property',
    default: ' ',
    isArray: true,
    name: 'units',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitCreateDto)
  units: UnitCreateDto[];
}
