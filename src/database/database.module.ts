import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { tenantDatabaseProviders } from './tenant.database.providers';

@Module({
    providers: [...databaseProviders, tenantDatabaseProviders],
    exports: [...databaseProviders, tenantDatabaseProviders]
})
export class DatabaseModule {}
