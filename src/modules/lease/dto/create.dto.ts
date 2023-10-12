import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LeaseTypeEnum } from 'src/common/constants/lease-type.enum';
import { LeaseApiPropConfig } from '../utils/swagger';
export class LeaseCreateDto {
  @ApiProperty(LeaseApiPropConfig.unitId)
  @IsNotEmpty()
  @IsString()
  readonly unitId: string;

  @ApiProperty(LeaseApiPropConfig.tenantId)
  @IsNotEmpty()
  @IsString()
  readonly tenantId: string;

  @ApiProperty(LeaseApiPropConfig.startDate)
  @IsNotEmpty()
  @IsString()
  readonly startDate: string;

  @ApiProperty(LeaseApiPropConfig.type)
  @IsNotEmpty()
  @IsEnum(LeaseTypeEnum)
  readonly type: LeaseTypeEnum;

  @ApiProperty(LeaseApiPropConfig.endDate)
  @IsString()
  @IsOptional()
  readonly endDate: string | null;

  validateDates() {
    if (this.type === LeaseTypeEnum.DEFINED) {
      if (!this.endDate) {
        return false;
      }
    }

    const datePattern =
      /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/]\d{4}$/;
    return (
      datePattern.test(this.startDate) &&
      (this.endDate ? datePattern.test(this.endDate) : true)
    );
  }
}
