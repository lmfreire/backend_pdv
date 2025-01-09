import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Materialsac } from './materialsac.entity';
import getTenantRepository from '../utils/get.tenant.repository';

@Injectable()
export class MaterialsacService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async materiaisComposicao(tentat: string, data: {cd_mat: string, cd_fil: string, cd_arm: string}){
        const repository: Repository<Materialsac> = await getTenantRepository(tentat, Materialsac, this.getTenantDataSource);

        const res =  await repository.find({
            where: {
                cd_mat: data.cd_mat
            }
        });

        return res
    }
}
