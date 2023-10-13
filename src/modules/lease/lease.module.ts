import { Module } from '@nestjs/common';
import { LeaseService } from './lease.service';
import { LeaseController } from './lease.controller';
import { Lease } from 'src/common/models/lease.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule } from '../tenant/tenant.module';
import { UnitModule } from '../unit/unit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lease]), TenantModule, UnitModule],
  controllers: [LeaseController],
  providers: [LeaseService],
})
export class LeaseModule {}
