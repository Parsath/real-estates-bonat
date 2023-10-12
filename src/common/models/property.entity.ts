import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Timeable } from './timeable';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyCreateDto } from 'src/modules/property/dto/create.dto';
import { Unit } from './unit.entity';

@Entity()
export class Property extends Timeable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: ' ',
    isArray: false,
    name: 'location',
    description: 'location of the user',
  })
  @Column({ nullable: false, unique: false })
  public location: string;

  @OneToMany(() => Unit, (unit) => unit.property, {
    onDelete: 'SET NULL',
  })
  public units: Unit[];

  constructor(entity?: PropertyCreateDto | Property) {
    super();
    Object.assign(this, entity);
  }
}
