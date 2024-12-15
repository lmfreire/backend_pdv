import { Provider } from '@nestjs/common'
import {DataSource} from 'typeorm'

export const databaseProviders: Provider[] = [
    {
        provide: 'DEVDATA_SOURCE',
        useFactory: () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: '165.227.189.227',
                port: 3306,
                username: 'root',
                password: '@dmlemarq2019',
                database: 'lemarqmy_sisgeral',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: false,
            })

            return dataSource.initialize()
        }
    }
]