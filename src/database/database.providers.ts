import { Provider } from '@nestjs/common'
import {DataSource} from 'typeorm'

export const databaseProviders: Provider[] = [
    {
        provide: 'DEVDATA_SOURCE',
        useFactory: () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATABASE,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: false,
            })

            return dataSource.initialize()
        }
    }
]