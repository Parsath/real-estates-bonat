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

  @ApiProperty(TenantApiPropConfig.firstName)
  @Column({ nullable: false })
  public firstName: string;

  @ApiProperty(TenantApiPropConfig.lastName)
  @Column({ nullable: false })
  public lastName: string;

  @ApiProperty(TenantApiPropConfig.phone)
  @Column({ nullable: false, unique: true })
  public phone: string;

  @ApiProperty(TenantApiPropConfig.email)
  @Column({ nullable: false, unique: true })
  public email: string;

  @ApiProperty(TenantApiPropConfig.leases)
  @OneToMany(() => Lease, (lease) => lease.tenant, {
    onDelete: 'SET NULL',
  })
  public leases: Lease[];

  constructor(entity?: TenantCreateDto | Tenant) {
    super();
    Object.assign(this, entity);
  }
}
