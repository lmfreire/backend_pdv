import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MaterialPrecos } from './material_precos.entity';
import getTenantRepository from '../utils/get.tenant.repository';

@Injectable()
export class MaterialPrecosService {

    constructor(
        @Inject('TENANT_DATA_SOURCE')
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async valorPrazo(tenant: string, cd_mat: string) {
        const repository: Repository<MaterialPrecos> = await getTenantRepository(tenant, MaterialPrecos, this.getTenantDataSource);
        
        return await repository.findOne({ where: { cd_mat } });
    }
}
