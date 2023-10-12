import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get entities(): string {
    return this.configService.get<string>('postgres.entities');
  }

  get host(): number {
    return Number(this.configService.get<number>('postgres.host'));
  }

  get password(): string {
    return this.configService.get<string>('postgres.password');
  }

  get port(): number {
    return Number(this.configService.get<number>('postgres.port'));
  }

  get subscribers(): string {
    return this.configService.get<string>('postgres.subscribers');
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('postgres.synchronize');
  }

  get type(): string {
    return this.configService.get<string>('postgres.type');
  }

  get username(): string {
    return this.configService.get<string>('postgres.username');
  }
}
