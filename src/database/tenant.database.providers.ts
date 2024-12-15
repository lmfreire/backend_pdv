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
                    host: '165.227.189.227',
                    port: 3306,
                    username: 'root',
                    password: '@dmlemarq2019',
                    database: `${tenantId}`, // Banco dinâmico baseado no tenantId
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: false,
                });
    
                dataSourceMap.set(tenantId, dataSource.initialize());
            }
    
            return await dataSourceMap.get(tenantId);
        }
    },
}