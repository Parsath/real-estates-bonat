import { Unit } from 'src/common/models/unit.entity';
import { UnitCreateDto } from 'src/modules/unit/dto/create.dto';

export const PropertyApiPropConfig = {
  location: {
    required: true,
    type: 'location',
    description: 'location of the property',
    default: ' ',
    isArray: false,
    name: 'location',
  },
  unitsDto: {
    required: true,
    type: () => UnitCreateDto,
    description: 'array of units create with the the property',
    default: ' ',
    isArray: true,
    name: 'units',
  },
  units: {
    type: () => Unit,
    isArray: true,
    default: [],
    description:
      'Types of properties (or units) to which the property is associated',
  },
};
