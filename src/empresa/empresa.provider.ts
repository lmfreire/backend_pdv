import { Provider } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Empresa } from "./empresa.entity";

const empresaRepository: Provider<Repository<Empresa>> = {
    provide: 'EMPRESA_REPOSITORY',
    useFactory: async (dataSource: DataSource) => {
        const repository: Repository<Empresa> = dataSource.getRepository(Empresa);
        return repository
    },
    inject: ['DEVDATA_SOURCE']
}

export const empresaProviders: Provider[] = [empresaRepository]