import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindOneParam {
  @ApiProperty({ type: 'string' })
  @IsUUID()
  id: string;
}
