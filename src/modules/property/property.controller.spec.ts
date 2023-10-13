import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { UnitCreateDto } from '../unit/dto/create.dto';
import { HttpStatus } from '@nestjs/common';
import { PropertyCreateDto } from './dto/create.dto';
import { PropertyTypeEnum } from 'src/common/constants/property-type.enum';
import { Property } from 'src/common/models/property.entity';
import { PropertyUpdateDto } from './dto/update.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitService } from '../unit/unit.service';
import { Unit } from 'src/common/models/unit.entity';

describe('PropertyController', () => {
  let propertyController: PropertyController;
  let propertyService: PropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        PropertyService,
        {
          provide: getRepositoryToken(Property), // Make sure to use the correct repository token
          useClass: Repository,
        },
        UnitService,
        {
          provide: getRepositoryToken(Unit), // Make sure to use the correct repository token
          useClass: Repository,
        },
      ],
    }).compile();

    propertyController = module.get<PropertyController>(PropertyController);
    propertyService = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(propertyController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new property', async () => {
      const createDto: PropertyCreateDto = {
        location: 'Test Location',
        units: [
          {
            type: PropertyTypeEnum.APPARTMENT,
            pricePerSquareMeter: 1000,
            numberOfRooms: 3,
            isAvailable: true,
          },
        ],
      };

      const mockCreatedProperty = {
        id: 'test-property-id',
        ...createDto,
      };

      jest
        .spyOn(propertyService, 'create')
        .mockImplementation(async () => HttpStatus.CREATED);

      const result = await propertyController.create(createDto);

      expect(result).toBe(HttpStatus.CREATED);
    });
  });

  describe('createUnit', () => {
    it('should create a new unit for the property', async () => {
      const propertyId = 'test-property-id';
      const createUnitDto: UnitCreateDto = {
        type: PropertyTypeEnum.APPARTMENT,
        pricePerSquareMeter: 1000,
        numberOfRooms: 3,
        isAvailable: true,
        propertyId,
      };

      jest
        .spyOn(propertyService, 'createUnit')
        .mockResolvedValue(HttpStatus.CREATED);

      const result = await propertyController.createUnit(
        createUnitDto,
        propertyId,
      );

      expect(result).toBe(HttpStatus.CREATED);
    });
  });

  describe('findAll', () => {
    it('should return an array of properties', async () => {
      const mockProperties: Property[] = [
        new Property({ id: 'property1', location: 'Location 1' }),
        new Property({ id: 'property2', location: 'Location 2' }),
      ];

      jest.spyOn(propertyService, 'findAll').mockResolvedValue(mockProperties);

      const result = await propertyController.findAll();

      expect(result).toBe(mockProperties);
    });
  });

  describe('findOne', () => {
    it('should return a property by ID', async () => {
      const propertyId = 'test-property-id';
      const mockProperty = new Property({
        id: propertyId,
        location: 'Test Location',
        units: [], // You can add units here if needed
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(propertyService, 'findOne').mockResolvedValue(mockProperty);

      const result = await propertyController.findOne(propertyId);

      expect(result).toBe(mockProperty);
    });

    it('should handle not found property', async () => {
      const propertyId = 'non-existent-id';

      jest
        .spyOn(propertyService, 'findOne')
        .mockRejectedValue(new Error('Property not found'));

      try {
        await propertyController.findOne(propertyId);
      } catch (error) {
        expect(error.message).toBe('Property not found');
      }
    });
  });

  describe('update', () => {
    it('should update a property and return OK status', async () => {
      const propertyId = 'test-property-id';
      const updateDto: PropertyUpdateDto = { location: 'Updated Location' };

      jest.spyOn(propertyService, 'update').mockResolvedValue(HttpStatus.OK);

      const result = await propertyController.update(propertyId, updateDto);

      expect(result).toBe(HttpStatus.OK);
    });

    it('should handle not found property during update', async () => {
      const propertyId = 'non-existent-id';
      const updateDto: PropertyUpdateDto = { location: 'Updated Location' };

      jest
        .spyOn(propertyService, 'update')
        .mockRejectedValue(new Error('Property not found'));

      try {
        await propertyController.update(propertyId, updateDto);
      } catch (error) {
        expect(error.message).toBe('Property not found');
      }
    });
  });

  describe('remove', () => {
    it('should remove a property and return OK status', async () => {
      const propertyId = 'test-property-id';

      jest.spyOn(propertyService, 'remove').mockResolvedValue(HttpStatus.OK);

      const result = await propertyController.remove(propertyId);

      expect(result).toBe(HttpStatus.OK);
    });

    it('should handle not found property during removal', async () => {
      const propertyId = 'non-existent-id';

      jest
        .spyOn(propertyService, 'remove')
        .mockRejectedValue(new Error('Property not found'));

      try {
        await propertyController.remove(propertyId);
      } catch (error) {
        expect(error.message).toBe('Property not found');
      }
    });
  });
});
