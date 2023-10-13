import { Test, TestingModule } from '@nestjs/testing';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { UnitCreateDto } from './dto/create.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Unit } from 'src/common/models/unit.entity';
import { Repository } from 'typeorm';
import { PropertyTypeEnum } from 'src/common/constants/property-type.enum';
import { HttpStatus } from '@nestjs/common';

describe('UnitController', () => {
  let unitController: UnitController;
  let unitService: UnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitController],
      providers: [
        UnitService,
        {
          provide: getRepositoryToken(Unit),
          useClass: Repository,
        },
      ],
    }).compile();

    unitController = module.get<UnitController>(UnitController);
    unitService = module.get<UnitService>(UnitService);
  });

  describe('findAll', () => {
    it('should return an array of units', async () => {
      const mockUnits = [
        {
          id: 'unit1',
          type: 'apartment',
          pricePerSquareMeter: BigInt(1000),
          numberOfRooms: 3,
          isAvailable: true,
          property: {}, // Add property object
          leases: [], // Add leases array
          createdAt: new Date(), // Add createdAt date
          updatedAt: new Date(), // Add updatedAt date
        },
        {
          id: 'unit2',
          type: 'house',
          pricePerSquareMeter: BigInt(1500),
          numberOfRooms: 4,
          isAvailable: true,
          property: {}, // Add property object
          leases: [], // Add leases array
          createdAt: new Date(), // Add createdAt date
          updatedAt: new Date(), // Add updatedAt date
        },
      ];

      jest.spyOn(unitService, 'findAll').mockResolvedValue(mockUnits as any);

      const result = await unitController.findAll();
      expect(result).toBe(mockUnits);
    });
  });

  describe('findOne', () => {
    it('should return a unit by ID', async () => {
      const unitId = 'test-unit-id';
      const mockUnit = {
        id: unitId,
        type: 'apartment',
        pricePerSquareMeter: BigInt(1000),
        numberOfRooms: 3,
        isAvailable: true,
        property: {}, // Add property object
        leases: [], // Add leases array
        createdAt: new Date(), // Add createdAt date
        updatedAt: new Date(), // Add updatedAt date
      };

      jest.spyOn(unitService, 'findOne').mockResolvedValue(mockUnit as any);

      const result = await unitController.findOne(unitId);
      expect(result).toBe(mockUnit);
    });
  });

  describe('update', () => {
    it('should update a unit', async () => {
      const unitId = 'test-unit-id';
      const updateUnitDto = {
        type: PropertyTypeEnum.HOUSE, // Provide the correct PropertyTypeEnum value
        pricePerSquareMeter: 1500,
        numberOfRooms: 4,
        isAvailable: true,
      };

      const mockUpdatedStatus = HttpStatus.OK;

      jest.spyOn(unitService, 'update').mockResolvedValue(mockUpdatedStatus);

      const result = await unitController.update(unitId, updateUnitDto);
      expect(result).toBe(mockUpdatedStatus);
    });
  });

  describe('remove', () => {
    it('should remove a unit by ID', async () => {
      const unitId = 'test-unit-id';
      const mockRemovedStatus = HttpStatus.OK;

      jest.spyOn(unitService, 'remove').mockResolvedValue(mockRemovedStatus);

      const result = await unitController.remove(unitId);
      expect(result).toBe(mockRemovedStatus);
    });
  });
});
