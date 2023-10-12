import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LeaseTypeEnum } from 'src/common/constants/lease-type.enum';
export class LeaseCreateDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'id of the property to be associated to the lease',
    default: ' ',
    isArray: false,
    name: 'propertyId',
  })
  @IsNotEmpty()
  @IsString()
  readonly propertyId: string;

  @ApiProperty({
    required: true,
    type: 'enum',
    description: 'id of the adherent to be associated to the lease',
    default: ' ',
    isArray: false,
    name: 'tenantId',
  })
  @IsNotEmpty()
  @IsString()
  readonly tenantId: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'start date of the lease (DD/MM/YYYY or DD-MM-YYYY)',
    default: ' ',
    isArray: false,
    name: 'startDate',
  })
  @IsNotEmpty()
  @IsString()
  readonly startDate: string;

  @ApiProperty({
    required: true,
    type: 'enum',
    description:
      'type of the lease (wheither it is a lease with a defined end date or a lease with an undefined end date)',
    default: ' ',
    isArray: false,
    name: 'type',
  })
  @IsNotEmpty()
  @IsEnum(LeaseTypeEnum)
  readonly type: LeaseTypeEnum;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'end date of the lease (DD/MM/YYYY or DD-MM-YYYY)',
    default: ' ',
    isArray: false,
    name: 'endDate',
  })
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
