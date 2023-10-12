import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Timeable } from './timeable';
import { ApiProperty } from '@nestjs/swagger';
import { TenantCreateDto } from 'src/modules/tenant/dto/create.dto';
import { Lease } from './lease.entity';
import { TenantApiPropConfig } from 'src/modules/tenant/utils/swagger';

@Entity()
export class Tenant extends Timeable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'firstName of the tenant',
    default: ' ',
    isArray: false,
    name: 'firstName',
  })
  @Column({ nullable: false })
  public firstName: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'lastName of the tenant',
    default: ' ',
    isArray: false,
    name: 'lastName',
  })
  @Column({ nullable: false })
  public lastName: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'phone of the tenant',
    default: ' ',
    isArray: false,
    name: 'phone',
  })
  @Column({ nullable: false, unique: true })
  public phone: string;

  @ApiProperty({
    required: true,
    type: 'email',
    description: 'email of the tenant',
    default: ' ',
    isArray: false,
    name: 'email',
  })
  @Column({ nullable: false, unique: true })
  public email: string;

  @ApiProperty({
    type: () => Lease,
    isArray: true,
    default: [],
    description: 'Leases of the tenant',
  })
  @OneToMany(() => Lease, (lease) => lease.tenant, {
    onDelete: 'SET NULL',
  })
  public leases: Lease[];

  constructor(entity?: TenantCreateDto | Tenant) {
    super();
    Object.assign(this, entity);
  }
}
