import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Empresa } from './empresa.entity';
import { Filial } from '../nfceseq/filial.entity';
import getTenantRepository from '../utils/get.tenant.repository';

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
}
