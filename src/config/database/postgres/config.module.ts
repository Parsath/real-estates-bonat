import { Module } from '@nestjs/common';
import { PostgresConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => postgresConfig,
    }),
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}
