import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import getTenantRepository from '../utils/get.tenant.repository';

@Injectable()
export class ClienteService {
    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async getCliente(tentat: string, cd_cli: string){
        const repository: Repository<Cliente> = await getTenantRepository(tentat, Cliente, this.getTenantDataSource);

        return await repository.findOne({
            where: {
                cd_cli: cd_cli
            }
        });
    }
}
