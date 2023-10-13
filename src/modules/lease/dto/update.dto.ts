import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LeaseApiPropConfig } from '../utils/swagger';
import { LeaseTypeEnum } from 'src/common/constants/lease-type.enum';

export class LeaseUpdateDto {
  @ApiProperty(LeaseApiPropConfig.unitId)
  @IsOptional()
  @IsString()
  readonly unitId?: string;

  @ApiProperty(LeaseApiPropConfig.tenantId)
  @IsOptional()
  @IsString()
  readonly tenantId?: string;

  @ApiProperty(LeaseApiPropConfig.startDate)
  @IsOptional()
  @IsString()
  readonly startDate?: string;

  @ApiProperty(LeaseApiPropConfig.type)
  @IsOptional()
  @IsEnum(LeaseTypeEnum)
  readonly type?: LeaseTypeEnum;

  @ApiProperty(LeaseApiPropConfig.endDate)
  @IsString()
  @IsOptional()
  readonly endDate?: string | null;
}
