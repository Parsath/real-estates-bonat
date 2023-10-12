import { Tenant } from 'src/common/models/tenant.entity';
import { Unit } from 'src/common/models/unit.entity';

export const LeaseApiPropConfig = {
  unitId: {
    required: true,
    type: 'string',
    description: 'id of the property to be associated to the lease',
    default: ' ',
    isArray: false,
    name: 'unitId',
  },
  tenantId: {
    required: true,
    type: 'enum',
    description: 'id of the adherent to be associated to the lease',
    default: ' ',
    isArray: false,
    name: 'tenantId',
  },
  startDate: {
    required: true,
    type: 'string',
    description: 'start date of the lease (DD/MM/YYYY or DD-MM-YYYY)',
    default: ' ',
    isArray: false,
    name: 'startDate',
  },
  type: {
    required: true,
    type: 'enum',
    description:
      'type of the lease (wheither it is a lease with a defined end date or a lease with an undefined end date)',
    default: ' ',
    isArray: false,
    name: 'type',
  },
  endDate: {
    required: false,
    type: 'string',
    description: 'end date of the lease (DD/MM/YYYY or DD-MM-YYYY)',
    default: ' ',
    isArray: false,
    name: 'endDate',
  },
  unit: {
    type: () => Unit,
    isArray: false,
    default: [],
    description: 'Property to which the lease is associated',
  },
  tenant: {
    type: () => Tenant,
    isArray: false,
    default: [],
    description: 'Tenant to which the lease is associated',
  },
};
