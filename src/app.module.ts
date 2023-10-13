import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TenantModule } from './modules/tenant/tenant.module';
import { PostgresConfigModule } from './config/database/postgres/config.module';
import { AppConfigModule } from './config/app/config.module';
import { ConfigModule } from '@nestjs/config';
import { PropertyModule } from './modules/property/property.module';
import { UnitModule } from './modules/unit/unit.module';

const _Modules = [
  ConfigModule.forRoot({ isGlobal: true }),
  AppConfigModule,
  PostgresConfigModule,
  TenantModule,
  PropertyModule,
  UnitModule,
];

@Module({
  imports: [..._Modules],
  controllers: [AppController],
})
export class AppModule {}
