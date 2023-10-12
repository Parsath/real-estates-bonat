import { HttpStatus, Injectable } from '@nestjs/common';
import { TenantCreateDto } from './dto/create.dto';
import { TenantUpdateDto } from './dto/update.dto';
import { Tenant } from '../../common/models/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import {
  throwFormValidationError,
  throwNotFoundPopupValidationError,
  throwPopupValidationError,
} from 'src/common/utils/errors.utils';
import { FindOneParam } from '../../common/validation/find-one';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly repository: Repository<Tenant>,
  ) {}

  public async create(payload: TenantCreateDto) {
    const checkIfNewEmailAlreadyExists = await this.repository.findOne({
      where: { email: payload.email },
      withDeleted: true,
    });
    if (checkIfNewEmailAlreadyExists) {
      throwFormValidationError({
        email: `Email (${payload.email}) already exists`,
      });
    }
    const checkIfNewPhoneAlreadyExists = await this.repository.findOne({
      where: { phone: payload.phone },
      withDeleted: true,
    });
    if (checkIfNewPhoneAlreadyExists) {
      throwFormValidationError({
        phone: `The phone number (${payload.phone}) already exists`,
      });
    }
    await this.repository.save(new Tenant(payload));

    return HttpStatus.CREATED;
  }

  public async findAll() {
    return await this.repository.find();
  }

  public async findOne({ id }: FindOneParam) {
    try {
      return await this.repository.findOneBy({ id });
    } catch (e) {
      throwPopupValidationError({ message: `The tenant doesn't exist` });
    }
  }

  public async update({ id }: FindOneParam, payload: TenantUpdateDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throwNotFoundPopupValidationError({
        message: `The tenant doesn't exist`,
      });
    }

    if (payload.email) {
      const checkIfNewEmailAlreadyExists = await this.repository.findOne({
        where: { email: payload.email, id: Not(id) },
        withDeleted: true,
      });

      if (checkIfNewEmailAlreadyExists) {
        throwFormValidationError({
          email: `Email (${payload.email}) already exists`,
        });
      }
    }

    if (payload.phone) {
      const checkIfNewPhoneAlreadyExists = await this.repository.findOne({
        where: { phone: payload.phone, id: Not(id) },
        withDeleted: true,
      });

      if (checkIfNewPhoneAlreadyExists) {
        throwFormValidationError({
          phone: `The phone number (${payload.phone}) already exists`,
        });
      }
    }

    Object.assign(entity, payload);
    await entity.save();

    return HttpStatus.OK;
  }

  public async remove({ id }: FindOneParam) {
    try {
      const entity = await this.repository.findOneByOrFail({ id });
      await this.repository.remove(entity);
      return HttpStatus.OK;
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `The tenant doesn't exist`,
      });
    }
  }
}
