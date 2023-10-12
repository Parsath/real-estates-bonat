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

  @ApiProperty(PropertyApiPropConfig.location)
  @Column({ nullable: false })
  public location: string;

  @ApiProperty(PropertyApiPropConfig.units)
  @OneToMany(() => Unit, (unit) => unit.property, {
    onDelete: 'SET NULL',
  })
  public units: Unit[];

  constructor(entity?: PropertyCreateDto | Property) {
    super();
    Object.assign(this, entity);
  }
}
