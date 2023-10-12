import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Timeable extends BaseEntity {
  @ApiProperty({
    type: 'date',
    required: false,
    default: ' ',
    isArray: false,
    name: 'createdAt',
    description: 'created date of the entity',
  })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({
    type: 'date',
    required: false,
    default: ' ',
    isArray: false,
    name: 'updatedAt',
    description: 'updated date of the entity',
  })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({
    type: 'date',
    required: false,
    default: ' ',
    isArray: false,
    name: 'deletedAt',
    description: 'soft deleted date of the entity',
  })
  @DeleteDateColumn()
  public deletedAt: Date;
}
