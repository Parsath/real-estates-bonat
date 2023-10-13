import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Timeable } from './timeable';
import { ApiProperty } from '@nestjs/swagger';
import { UnitCreateDto } from 'src/modules/unit/dto/create.dto';
import { PropertyTypeEnum } from '../constants/property-type.enum';
import { Property } from './property.entity';
import { Lease } from './lease.entity';
import { UnitApiPropConfig } from '../../modules/unit/utils/swagger';

@Entity()
export class Unit extends Timeable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty(UnitApiPropConfig.type)
  @Column({ type: 'enum', enum: PropertyTypeEnum })
  public type: PropertyTypeEnum;

  @ApiProperty(UnitApiPropConfig.pricePerSquareMeter)
  @Column({ type: 'bigint', nullable: false })
  public pricePerSquareMeter: number;

  @ApiProperty(UnitApiPropConfig.numberOfRooms)
  @Column({ nullable: false })
  public numberOfRooms: number;

  @ApiProperty(UnitApiPropConfig.isAvailable)
  @Column({ default: true })
  public isAvailable: boolean;

  @ApiProperty(UnitApiPropConfig.property)
  @ManyToOne(() => Property, (property) => property.units, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public property: Property;

  @ApiProperty(UnitApiPropConfig.leases)
  @OneToMany(() => Lease, (lease) => lease.unit, {
    onDelete: 'SET NULL',
  })
  public leases: Lease[];

  constructor(entity?: UnitCreateDto | Unit) {
    super();
    Object.assign(this, entity);
  }
}
