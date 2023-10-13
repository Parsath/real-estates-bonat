import { HttpStatus, Injectable } from '@nestjs/common';
import { UnitCreateDto } from './dto/create.dto';
import { UnitUpdateDto } from './dto/update.dto';
import { FindOneParam } from 'src/common/validation/find-one';
import { Unit } from 'src/common/models/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { throwNotFoundPopupValidationError } from 'src/common/utils/errors.utils';

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
    return await this.repository.find({
      relations: { property: true, leases: true },
    });
  }

  public async findOne({ id }: FindOneParam) {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
        relations: { property: true, leases: true },
      });
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `This unit doesn't exist`,
      });
    }
  }

  public async update({ id }: FindOneParam, payload: UnitUpdateDto) {
    const entity = await this.findOne({ id });
    Object.assign(entity, payload);
    try {
      await entity.save();
      return HttpStatus.OK;
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `There was an error updating the unit`,
      });
    }
  }

  public async remove({ id }: FindOneParam) {
    await this.findOne({ id });
    try {
      await this.repository.delete(id);
      return HttpStatus.OK;
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `The unit doesn't exist`,
      });
    }
  }
}
