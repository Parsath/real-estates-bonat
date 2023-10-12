import { Lease } from 'src/common/models/lease.entity';

export const TenantApiPropConfig = {
  email: {
    required: true,
    type: 'email',
    description: 'email of the tenant',
    default: ' ',
    isArray: false,
    name: 'email',
  },
  firstName: {
    required: true,
    type: 'string',
    description: 'firstName of the tenant',
    default: ' ',
    isArray: false,
    name: 'firstName',
  },
  lastName: {
    required: true,
    type: 'string',
    description: 'lastName of the tenant',
    default: ' ',
    isArray: false,
    name: 'lastName',
  },
  phone: {
    required: true,
    type: 'string',
    description: 'phone of the tenant',
    default: ' ',
    isArray: false,
    name: 'phone',
  },
  leases: {
    type: () => Lease,
    isArray: true,
    default: [],
    description: 'Leases of the tenant',
  },
};
