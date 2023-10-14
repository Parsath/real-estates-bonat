import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaseService } from './lease.service';
import { LeaseCreateDto } from './dto/create.dto';
import { LeaseUpdateDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('lease')
@ApiTags('Lease')
export class LeaseController {
  constructor(private readonly leaseService: LeaseService) {}

  // or lease
  @Post()
  create(@Body() payload: LeaseCreateDto) {
    return this.leaseService.create(payload);
  }

  @Put('unlease/:id')
  unlease(@Param('id') id: string) {
    return this.leaseService.unleaseUnit({ id });
  }

  @Get('tenant/:id')
  findTenantLeases(@Param('id') id: string) {
    return this.leaseService.findTenantLeases({ id });
  }

  @Get('unit/:id')
  getActiveLeaseForUnit(@Param('id') id: string) {
    return this.leaseService.getActiveUnitLease({ id });
  }

  @Get()
  findAll() {
    return this.leaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaseService.findOne({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: LeaseUpdateDto) {
    return this.leaseService.update({ id }, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaseService.remove({ id });
  }
}
