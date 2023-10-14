import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { LeaseController } from './lease.controller';
import { LeaseService } from './lease.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lease } from 'src/common/models/lease.entity';
import { Repository } from 'typeorm';
import { LeaseTypeEnum } from 'src/common/constants/lease-type.enum';
import { UnitService } from '../unit/unit.service';
import { Unit } from 'src/common/models/unit.entity';
import { Tenant } from 'src/common/models/tenant.entity';
import { TenantService } from '../tenant/tenant.service';

describe('LeaseController', () => {
  let leaseController: LeaseController;
  let leaseService: LeaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaseController],
      providers: [
        LeaseService,
        {
          provide: getRepositoryToken(Lease),
          useClass: Repository,
        },
        UnitService,
        {
          provide: getRepositoryToken(Unit), // Make sure to use the correct repository token
          useClass: Repository,
        },
        TenantService,
        {
          provide: getRepositoryToken(Tenant), // Make sure to use the correct repository token
          useClass: Repository,
        },
      ],
    }).compile();

    leaseController = module.get<LeaseController>(LeaseController);
    leaseService = module.get<LeaseService>(LeaseService);
  });

  describe('create', () => {
    it('should create a new lease', async () => {
      const mockLeaseCreateDto = {
        unitId: 'test-unit-id',
        tenantId: 'test-tenant-id',
        startDate: '10-12-2023',
        endDate: '12-12-2023',
      };

      jest.spyOn(leaseService, 'create').mockResolvedValue(HttpStatus.CREATED);

      const result = await leaseController.create(mockLeaseCreateDto);
      expect(result).toBe(HttpStatus.CREATED);
    });
  });

  describe('unlease', () => {
    it('should unlease a unit', async () => {
      const unitId = 'test-unit-id';

      jest.spyOn(leaseService, 'unleaseUnit').mockResolvedValue(HttpStatus.OK);

      const result = await leaseController.unlease(unitId);
      expect(result).toBe(HttpStatus.OK);
    });
  });

  describe('update', () => {
    it('should update a lease', async () => {
      const leaseId = 'test-lease-id';
      const updateLeaseDto = {
        /* mock update lease data */
      };

      const mockUpdatedStatus = HttpStatus.OK;

      jest.spyOn(leaseService, 'update').mockResolvedValue(mockUpdatedStatus);

      const result = await leaseController.update(leaseId, updateLeaseDto);
      expect(result).toBe(mockUpdatedStatus);
    });
  });

  describe('remove', () => {
    it('should remove a lease by ID', async () => {
      const leaseId = 'test-lease-id';

      const mockRemoveStatus = HttpStatus.OK;

      jest.spyOn(leaseService, 'remove').mockResolvedValue(mockRemoveStatus);

      const result = await leaseController.remove(leaseId);
      expect(result).toBe(mockRemoveStatus);
    });
  });

  // Implement the other test cases as needed
});
