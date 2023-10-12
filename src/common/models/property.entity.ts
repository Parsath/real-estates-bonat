import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Timeable } from './timeable';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyCreateDto } from 'src/modules/property/dto/create.dto';
import { Unit } from './unit.entity';
import { PropertyApiPropConfig } from 'src/modules/property/utils/swagger';

@Entity()
export class Property extends Timeable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    required: true,
    type: 'location',
    description: 'location of the property',
    default: ' ',
    isArray: false,
    name: 'location',
  })
  @Column({ nullable: false })
  public location: string;

  @ApiProperty({
    type: () => Unit,
    isArray: true,
    default: [],
    description:
      'Types of properties (or units) to which the property is associated',
  })
  @OneToMany(() => Unit, (unit) => unit.property, {
    onDelete: 'SET NULL',
  })
  public units: Unit[];

  constructor(entity?: PropertyCreateDto | Property) {
    super();
    Object.assign(this, entity);
  }
}
