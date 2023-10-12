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
import { PropertyTypeEnum } from '../constants/appartment-type.enum';
import { Property } from './property.entity';
import { Lease } from './lease.entity';

@Entity()
export class Unit extends Timeable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    type: 'enum',
    required: true,
    default: ' ',
    isArray: false,
    name: 'type',
    description: 'type of the property',
  })
  @Column({ type: 'enum', enum: PropertyTypeEnum })
  public type: PropertyTypeEnum;

  @ApiProperty({
    type: 'number',
    required: true,
    default: ' ',
    isArray: false,
    name: 'pricePerSquareMeter',
    description: 'price per square meter of the property',
  })
  @Column({ type: 'bigint', nullable: false })
  public pricePerSquareMeter: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: ' ',
    isArray: false,
    name: 'numberOfRooms',
    description: 'number of rooms of the property',
  })
  @Column({ nullable: false })
  public numberOfRooms: number;

  @ApiProperty({
    type: 'boolean',
    required: true,
    default: ' ',
    isArray: false,
    name: 'isActive',
    description:
      'state of the property (usefull for disabling a property all together)',
  })
  @Column({ default: true })
  public isAvailable: boolean;

  @ApiProperty({
    type: () => Property,
    isArray: false,
    default: [],
    description: 'property of the user',
  })
  @ManyToOne(() => Property, (property) => property.units, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public property: Property;

  @ApiProperty({
    type: () => Lease,
    isArray: true,
    default: [],
    description: 'Leases associated with the unit',
  })
  @OneToMany(() => Lease, (lease) => lease.unit, {
    onDelete: 'SET NULL',
  })
  public leases: Lease[];

  //   @OneToMany(() => Unit, (unit) => unit.adherent, {
  //     onDelete: 'SET NULL',
  //   })
  //   public unit: Unit[];

  constructor(entity?: UnitCreateDto | Unit) {
    super();
    Object.assign(this, entity);
  }
}
