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
    description: 'createdAt of the entity',
  })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({
    type: 'date',
    required: false,
    default: ' ',
    isArray: false,
    name: 'updatedAt',
    description: 'updatedAt of the entity',
  })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({
    type: 'date',
    required: false,
    default: ' ',
    isArray: false,
    name: 'deletedAt',
    description: 'deletedAt of the entity',
  })
  @DeleteDateColumn()
  public deletedAt: Date;
}
