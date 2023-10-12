import { Lease } from 'src/common/models/lease.entity';
import { Property } from 'src/common/models/property.entity';

export const UnitApiPropConfig = {
  type: {
    required: true,
    type: 'enum',
    description: 'type of the property',
    default: ' ',
    isArray: false,
    name: 'type',
  },
  pricePerSquareMeter: {
    required: true,
    type: 'number',
    description: 'price per square meter of the property',
    default: ' ',
    isArray: false,
    name: 'pricePerSquareMeter',
  },
  numberOfRooms: {
    required: true,
    type: 'number',
    description: 'number of rooms of the property',
    default: ' ',
    isArray: false,
    name: 'numberOfRooms',
  },
  isAvailable: {
    required: false,
    type: 'boolean',
    description: 'availability of the property',
    default: ' ',
    isArray: false,
    name: 'isAvailable',
  },

  property: {
    type: () => Property,
    isArray: false,
    default: [],
    description: 'property linked to the unit',
  },
  leases: {
    type: () => Lease,
    isArray: true,
    default: [],
    description: 'Leases associated with the unit',
  },
};
