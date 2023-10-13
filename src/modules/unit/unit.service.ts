import { Injectable } from '@nestjs/common';
import { UnitCreateDto } from './dto/create.dto';
import { UnitUpdateDto } from './dto/update.dto';
import { FindOneParam } from 'src/common/validation/find-one';
import { Unit } from 'src/common/models/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly repository: Repository<Unit>,
  ) {}

  public async create(payload: UnitCreateDto) {
    return await this.repository.save(new Unit(payload));
  }

  public async findAll() {
    return `This action returns all unit`;
  }

  public async findOne({ id }: FindOneParam) {
    return `This action returns a #${id} unit`;
  }

  public async update({ id }: FindOneParam, payload: UnitUpdateDto) {
    return `This action updates a #${id} unit`;
  }

  public async remove({ id }: FindOneParam) {
    return `This action removes a #${id} unit`;
  }
}
