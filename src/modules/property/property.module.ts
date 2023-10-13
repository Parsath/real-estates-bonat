import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property } from 'src/common/models/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitModule } from '../unit/unit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), UnitModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
