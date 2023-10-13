import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyCreateDto } from './dto/create.dto';
import { PropertyUpdateDto } from './dto/update.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  create(@Body() payload: PropertyCreateDto) {
    return this.propertyService.create(payload);
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: PropertyUpdateDto) {
    return this.propertyService.update({ id }, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove({ id });
  }
}
