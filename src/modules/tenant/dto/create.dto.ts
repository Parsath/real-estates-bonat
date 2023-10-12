import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class TenantCreateDto {
  @ApiProperty({
    required: true,
    type: 'email',
    description: 'email of the tenant',
    default: ' ',
    isArray: false,
    name: 'email',
  })
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'firstName of the tenant',
    default: ' ',
    isArray: false,
    name: 'firstName',
  })
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'lastName of the tenant',
    default: ' ',
    isArray: false,
    name: 'lastName',
  })
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'phone of the tenant',
    default: ' ',
    isArray: false,
    name: 'phone',
  })
  @IsNotEmpty()
  @IsString()
  public phone: string;
}
