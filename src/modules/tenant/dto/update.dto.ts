import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TenantApiPropConfig } from '../utils/swagger';
import { TenantCreateDto } from './create.dto';

export class TenantUpdateDto extends PartialType(TenantCreateDto) {
  @ApiProperty(TenantApiPropConfig.email)
  @IsOptional()
  @IsString()
  readonly email: string;

  @ApiProperty(TenantApiPropConfig.firstName)
  @IsOptional()
  readonly firstName: string;

  @ApiProperty(TenantApiPropConfig.lastName)
  @IsOptional()
  readonly lastName: string;

  @ApiProperty(TenantApiPropConfig.phone)
  @IsOptional()
  @IsString()
  readonly phone: string;
}
