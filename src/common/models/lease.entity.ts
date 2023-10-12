import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Timeable } from './timeable';
import { ApiProperty } from '@nestjs/swagger';
import { LeaseCreateDto } from 'src/modules/lease/dto/create.dto';
import { PropertyTypeEnum } from '../constants/appartment-type.enum';
import { Property } from './property.entity';
import { LeaseTypeEnum } from '../constants/lease-type.enum';
import { Unit } from './unit.entity';
import { Tenant } from './tenant.entity';

@Entity()
export class Lease extends Timeable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    type: 'date',
    required: true,
    default: ' ',
    isArray: false,
    name: 'startDate',
    description: 'start date of the lease',
  })
  @Column({ nullable: false })
  public startDate: Date;

  @ApiProperty({
    type: 'date',
    required: false,
    default: ' ',
    isArray: false,
    name: 'endDate',
    description: 'end date of the lease',
  })
  @Column({ nullable: true })
  public endDate: Date;

  @ApiProperty({
    type: 'enum',
    required: true,
    default: ' ',
    isArray: false,
    name: 'type',
    description:
      'type of the lease (wheither it is a lease with a defined end date or a lease with an open end date)',
  })
  @Column({ type: 'enum', enum: LeaseTypeEnum })
  public type: LeaseTypeEnum;

  @ApiProperty({
    type: () => Unit,
    isArray: false,
    default: [],
    description: 'Property to which the lease is associated',
  })
  @ManyToOne(() => Unit, (unit) => unit.leases, {
    onDelete: 'SET NULL',
  })
  public unit: Unit;

  @ApiProperty({
    type: () => Unit,
    isArray: false,
    default: [],
    description: 'Tenant to which the lease is associated',
  })
  @ManyToOne(() => Tenant, (tenant) => tenant.leases, {
    onDelete: 'SET NULL',
  })
  public tenant: Tenant;

  constructor(entity?: LeaseCreateDto | Lease) {
    super();
    Object.assign(this, entity);
  }
}
