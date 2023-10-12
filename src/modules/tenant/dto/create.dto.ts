import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TenantApiPropConfig } from '../utils/swagger';
export class TenantCreateDto {
  @ApiProperty(TenantApiPropConfig.email)
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty(TenantApiPropConfig.firstName)
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty(TenantApiPropConfig.lastName)
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty(TenantApiPropConfig.phone)
  @IsNotEmpty()
  @IsString()
  readonly phone: string;
}
