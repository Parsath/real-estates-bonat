import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Timeable } from './timeable';
import { ApiProperty } from '@nestjs/swagger';
import { TenantCreateDto } from 'src/modules/tenant/dto/create.dto';

@Entity()
export class Tenant extends Timeable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: ' ',
    isArray: false,
    name: 'firstName',
    description: 'firstName of the tenant',
  })
  @Column({ nullable: false, unique: false })
  public firstName: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: ' ',
    isArray: false,
    name: 'lastName',
    description: 'lastName of the tenant',
  })
  @Column({ nullable: false, unique: false })
  public lastName: string;

  @ApiProperty({
    type: 'string',
    required: false,
    default: ' ',
    isArray: false,
    name: 'phone',
    description: 'phone number of the tenant',
  })
  @Column({ nullable: false, unique: true })
  public phone: string;

  @ApiProperty({
    type: 'email',
    required: true,
    default: ' ',
    isArray: false,
    description: 'email of the tenant',
  })
  @Column({ nullable: false, unique: true })
  public email: string;

  //   @OneToMany(() => Lease, (lease) => lease.adherent, {
  //     onDelete: 'SET NULL',
  //   })
  //   public lease: Lease[];

  constructor(entity?: TenantCreateDto | Tenant) {
    super();
    Object.assign(this, entity);
  }
}
