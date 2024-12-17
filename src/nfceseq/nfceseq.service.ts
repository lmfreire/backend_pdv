import { Inject, Injectable } from '@nestjs/common';
import getTenantRepository from 'src/utils/get.tenant.repository';
import { DataSource, Repository } from 'typeorm';
import { Nfceseq } from './nfceseq.entity';

@Injectable()
export class NfceseqService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async getNfce(tentat: string){
        const repository: Repository<Nfceseq> = await getTenantRepository(tentat, Nfceseq, this.getTenantDataSource);

        return await repository.find()
    }

    async bloquearTerminal(tenant: string, data: {id_terminal: string; user_login: string}){
        const repository: Repository<Nfceseq> = await getTenantRepository(tenant, Nfceseq, this.getTenantDataSource);

        await repository.update(data.id_terminal, {
            login_ativo : data.user_login,
            sn_ativo: '1'
        })        
    }

}
