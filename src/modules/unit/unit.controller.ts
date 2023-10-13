import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitCreateDto } from './dto/create.dto';
import { UnitUpdateDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('unit')
@ApiTags('Unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: UnitUpdateDto) {
    return this.unitService.update({ id }, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove({ id });
  }
}
