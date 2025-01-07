import { Inject, Injectable } from '@nestjs/common';
import { Empresa_org } from './empresa_org.entity';
import { DataSource, Repository } from 'typeorm';
import getTenantRepository from '../utils/get.tenant.repository';
import { Filial } from '../nfceseq/filial.entity';

@Injectable()
export class EmpresaOrgService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async tipoVendedor(tenant: string, data: {cd_fil: string}) {
        const repositoryNfceseq: Repository<Empresa_org> = await getTenantRepository(tenant, Empresa_org, this.getTenantDataSource);
        
        const vendedor = await repositoryNfceseq.createQueryBuilder()
            .select('empresa')
            .from(Empresa_org,'empresa')
            .innerJoinAndMapOne('empresa.cd_loja', Filial, 'filial', `filial.cd_loja = empresa.cd_loja and filial.cd_fil = ${data.cd_fil}`)            
            .getOne();

        

        return {"sn_vend":vendedor.sn_vend}        
    }

    async tipoEstoque(tenant: string, data: {cd_fil: string}) {
        const repositoryNfceseq: Repository<Empresa_org> = await getTenantRepository(tenant, Empresa_org, this.getTenantDataSource);
        
        const vendedor = await repositoryNfceseq.createQueryBuilder()
            .select('empresa')
            .from(Empresa_org,'empresa')
            .innerJoinAndMapOne('empresa.cd_loja', Filial, 'filial', `filial.cd_loja = empresa.cd_loja and filial.cd_fil = ${data.cd_fil}`)            
            .getOne();

        

        return {"sn_vend":vendedor.sn_vend}        
    }
}
