import { Injectable } from '@nestjs/common';
import { TenantCreateDto } from './dto/create.dto';
import { TenantUpdateDto } from './dto/update.dto';

@Injectable()
export class TenantService {
  create(createTenantDto: TenantCreateDto) {
    return 'This action adds a new tenant';
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: TenantUpdateDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
