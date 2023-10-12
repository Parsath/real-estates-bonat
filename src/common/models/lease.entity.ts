import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Timeable } from './timeable';
import { ApiProperty } from '@nestjs/swagger';
import { LeaseCreateDto } from 'src/modules/lease/dto/create.dto';
import { LeaseTypeEnum } from '../constants/lease-type.enum';
import { Unit } from './unit.entity';
import { Tenant } from './tenant.entity';
import { LeaseApiPropConfig } from 'src/modules/lease/utils/swagger';

@Entity()
export class Lease extends Timeable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty(LeaseApiPropConfig.startDate)
  @Column({ nullable: false })
  public startDate: Date;

  @ApiProperty(LeaseApiPropConfig.endDate)
  @Column({ nullable: true })
  public endDate: Date;

  @ApiProperty(LeaseApiPropConfig.type)
  @Column({ type: 'enum', enum: LeaseTypeEnum })
  public type: LeaseTypeEnum;

  @ApiProperty(LeaseApiPropConfig.unit)
  @ManyToOne(() => Unit, (unit) => unit.leases, {
    onDelete: 'SET NULL',
  })
  public unit: Unit;

  @ApiProperty(LeaseApiPropConfig.tenant)
  @ManyToOne(() => Tenant, (tenant) => tenant.leases, {
    onDelete: 'SET NULL',
  })
  public tenant: Tenant;

  constructor(entity?: LeaseCreateDto | Lease) {
    super();
    Object.assign(this, entity);
  }
}
