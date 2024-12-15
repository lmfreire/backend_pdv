import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Empresa } from './empresa.entity';

@Injectable()
export class EmpresaService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>,
        @Inject('EMPRESA_REPOSITORY')
        private readonly empresaRepository: Repository<Empresa>
    ){}

    async findEmpresas(){
        return await this.empresaRepository.find();
    }

    async findEmpresaByCodigo(codigo: string){
        return await this.empresaRepository.findOneBy({
            cd_empresa: codigo
        });
    }

    // async getTenantRepository<T>(tenantId: string, entity: new () => T) {
    // const tenantDataSource = await this.getTenantDataSource(tenantId);
    // return tenantDataSource.getRepository(entity);
    // }
}
