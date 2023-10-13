import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindOneParam } from 'src/common/validation/find-one';
import { Property } from 'src/common/models/property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyCreateDto } from './dto/create.dto';
import { PropertyUpdateDto } from './dto/update.dto';
import { UnitService } from '../unit/unit.service';
import { throwNotFoundPopupValidationError } from 'src/common/utils/errors.utils';
import { UnitCreateDto } from '../unit/dto/create.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly repository: Repository<Property>,
    @Inject(UnitService)
    private readonly unitService: UnitService,
  ) {}

  public async createUnit({ id }: FindOneParam, payload: UnitCreateDto) {
    const property = await this.findOne({ id });

    await this.unitService.create({
      ...payload,
      property,
    });
    return HttpStatus.CREATED;
  }

  public async create(payload: PropertyCreateDto) {
    const property = this.repository.create(payload);

    const savedEntity = await this.repository.save(property);
    if (payload.units && payload.units.length > 0) {
      property.units = await Promise.all(
        payload.units.map(async (unitData) => {
          return await this.unitService.create({
            ...unitData,
            property: savedEntity,
          });
        }),
      );
    }
    return HttpStatus.CREATED;
  }

  public async findAll() {
    return await this.repository.find({
      relations: { units: true },
    });
  }

  public async findOne({ id }: FindOneParam) {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
        relations: { units: true },
      });
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `The property doesn't exist`,
      });
    }
  }

  public async update({ id }: FindOneParam, payload: PropertyUpdateDto) {
    const entity = await this.findOne({ id });
    Object.assign(entity, payload);
    try {
      await entity.save();
      return HttpStatus.OK;
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `The property doesn't exist`,
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
        message: `The property doesn't exist`,
      });
    }
  }
}
