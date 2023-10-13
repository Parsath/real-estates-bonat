import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PropertyCreateDto } from './create.dto';
import { PropertyApiPropConfig } from '../utils/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PropertyUpdateDto {
  @ApiProperty(PropertyApiPropConfig.location)
  @IsNotEmpty()
  @IsString()
  readonly location: string;
}
