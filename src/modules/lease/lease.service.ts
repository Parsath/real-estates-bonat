import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindOneParam } from 'src/common/validation/find-one';
import { LeaseCreateDto } from './dto/create.dto';
import { LeaseUpdateDto } from './dto/update.dto';
import { Lease } from 'src/common/models/lease.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { throwNotFoundPopupValidationError } from 'src/common/utils/errors.utils';
import { TenantService } from '../tenant/tenant.service';
import { UnitService } from '../unit/unit.service';
import { LeaseTypeEnum } from 'src/common/constants/lease-type.enum';
import { validateDates } from './utils/functions';

@Injectable()
export class LeaseService {
  constructor(
    @InjectRepository(Lease)
    private readonly repository: Repository<Lease>,
    @Inject(UnitService)
    private readonly unitService: UnitService,
    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  public async create(payload: LeaseCreateDto) {
    if (!validateDates(payload.startDate, payload.endDate))
      throwNotFoundPopupValidationError({
        message: `Invalid date format (MM-DD-YYYY or MM/DD/YYYY)`,
      });

    const unit = await this.unitService.findOne({ id: payload.unitId });

    if (await this.checkIfUnitHasActiveLease({ id: payload.unitId }))
      throwNotFoundPopupValidationError({
        message: `The unit has an active lease`,
      });

    const tenant = await this.tenantService.findOne({ id: payload.tenantId });

    const lease = this.repository.create({
      ...payload,
      tenant,
      unit,
    });

    lease.type = payload.endDate ? LeaseTypeEnum.DEFINED : LeaseTypeEnum.OPEN;
    lease.startDate = new Date(payload.startDate);
    lease.endDate = payload.endDate ? new Date(payload.endDate) : null;

    await this.repository.save(lease);
    return HttpStatus.CREATED;
  }

  public async findAll() {
    return await this.repository.find({
      relations: { unit: true, tenant: true },
    });
  }

  public async findOne({ id }: FindOneParam) {
    try {
      return await this.repository.findOne({
        where: { id },
        relations: { unit: true, tenant: true },
      });
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `The lease doesn't exist`,
      });
    }
  }

  public async checkIfUnitHasActiveLease({ id }: FindOneParam) {
    const lease = await this.repository
      .createQueryBuilder('lease')
      .leftJoinAndSelect('lease.unit', 'unit')
      .where(
        'unit.id = :id AND (lease.endDate IS NULL OR lease.endDate >= :date)',
        { id, date: new Date() },
      )
      .getOne();

    return !!lease;
  }

  public async unleaseUnit({ id }: FindOneParam) {
    const lease = await this.findOne({ id });

    lease.endDate = new Date();

    try {
      await lease.save();
      return HttpStatus.OK;
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `There was an error unleasing the unit`,
      });
    }
  }

  public async update({ id }: FindOneParam, payload: LeaseUpdateDto) {
    if (
      (payload.startDate || payload.endDate) &&
      !validateDates(payload.startDate, payload.endDate)
    )
      throwNotFoundPopupValidationError({
        message: `Invalid date format (MM-DD-YYYY or MM/DD/YYYY)`,
      });

    const lease = await this.findOne({ id });

    if (payload.tenantId) {
      const newTenant = await this.tenantService.findOne({
        id: payload.tenantId,
      });
      lease.tenant = newTenant;
    }
    if (payload.unitId) {
      const newUnit = await this.unitService.findOne({ id: payload.unitId });
      if (await this.checkIfUnitHasActiveLease({ id: newUnit.id }))
        throwNotFoundPopupValidationError({
          message: `The unit has an active lease`,
        });

      lease.unit = newUnit;
    }

    lease.startDate = payload.startDate
      ? new Date(payload.startDate)
      : lease.startDate;
    lease.endDate = payload.endDate ? new Date(payload.endDate) : lease.endDate;
    lease.type = payload.type ? payload.type : lease.type;

    try {
      await lease.save();
      return HttpStatus.OK;
    } catch (e) {
      throwNotFoundPopupValidationError({
        message: `There was an error updating the lease`,
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
        message: `The lease doesn't exist`,
      });
    }
  }
}
