import { Provider } from "@nestjs/common";
import { DataSource } from 'typeorm';

export const tenantDatabaseProviders: Provider = {
    provide: 'TENANT_DATA_SOURCE',
    useFactory: () => { 
        const dataSourceMap = new Map<string, Promise<DataSource>>()

        return async (tenantId: string): Promise<DataSource> => {
            if (!dataSourceMap.has(tenantId)) {
                const dataSource = new DataSource({
                    type: 'mysql',
                    host: process.env.DATABASE_HOST,
                    port: parseInt(process.env.DATABASE_PORT),
                    username: process.env.DATABASE_USERNAME,
                    password: process.env.DATABASE_PASSWORD,
                    database: `${tenantId}`,
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: false,
                });
    
                dataSourceMap.set(tenantId, dataSource.initialize());
            }
    
            return await dataSourceMap.get(tenantId);
        }
    },
}