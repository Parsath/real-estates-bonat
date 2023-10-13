import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { LeaseApiPropConfig } from '../utils/swagger';
export class LeaseCreateDto {
  @ApiProperty(LeaseApiPropConfig.unitId)
  @IsNotEmpty()
  @IsUUID()
  readonly unitId: string;

  @ApiProperty(LeaseApiPropConfig.tenantId)
  @IsNotEmpty()
  @IsUUID()
  readonly tenantId: string;

  @ApiProperty(LeaseApiPropConfig.startDate)
  @IsNotEmpty()
  @IsString()
  readonly startDate: string;

  @ApiProperty(LeaseApiPropConfig.endDate)
  @IsString()
  @IsOptional()
  readonly endDate: string | null;
}
