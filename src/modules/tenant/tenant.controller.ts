import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantCreateDto } from './dto/create.dto';
import { TenantUpdateDto } from './dto/update.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() createTenantDto: TenantCreateDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: TenantUpdateDto) {
    return this.tenantService.update({ id }, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove({ id });
  }
}
