import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { TenantCreateDto } from './dto/create.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from 'src/common/models/tenant.entity';
import { Repository } from 'typeorm';
import { TenantUpdateDto } from './dto/update.dto';

describe('TenantController', () => {
  let controller: TenantController;
  let service: TenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        TenantService,
        {
          provide: getRepositoryToken(Tenant),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
    service = module.get<TenantService>(TenantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new tenant', async () => {
      const createDto: TenantCreateDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
      };

      jest.spyOn(service, 'create').mockResolvedValue(HttpStatus.CREATED);

      const result = await controller.create(createDto);

      expect(result).toBe(HttpStatus.CREATED);
    });
  });

  describe('findAll', () => {
    it('should return an array of tenants', async () => {
      const tenants = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(tenants);

      const result = await controller.findAll();

      expect(result).toEqual(tenants);
    });
  });

  describe('findOne', () => {
    it('should return a single tenant', async () => {
      const tenantId = 'sample-tenant-id';
      const tenant = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(Object.assign(tenant));

      const result = await controller.findOne(tenantId);

      expect(result).toEqual(tenant);
    });
  });

  describe('update', () => {
    it('should update a tenant and return HttpStatus.OK', async () => {
      const tenantId = 'sample-tenant-id';
      const updateDto: TenantUpdateDto = {
        email: 'test@exmple.com',
        firstName: 'Jane',
      };
      jest.spyOn(service, 'update').mockResolvedValue(HttpStatus.OK);

      const result = await controller.update(tenantId, updateDto);

      expect(result).toEqual(HttpStatus.OK);
    });
  });

  describe('remove', () => {
    it('should remove a tenant and return HttpStatus.NO_CONTENT', async () => {
      const tenantId = 'sample-tenant-id';
      jest.spyOn(service, 'remove').mockResolvedValue(HttpStatus.NO_CONTENT);

      const result = await controller.remove(tenantId);

      expect(result).toEqual(HttpStatus.NO_CONTENT);
    });
  });
});
