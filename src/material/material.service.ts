import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { Material } from './repres.entity';
import getTenantRepository from 'src/utils/get.tenant.repository';

@Injectable()
export class MaterialService {
    constructor(
            @Inject('TENANT_DATA_SOURCE') 
            private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async getMaterial(tentat: string){
        const repository: Repository<Material> = await getTenantRepository(tentat, Material, this.getTenantDataSource);

        return await repository.find();
    }

    async getProdutos(tentat: string){
        const repository: Repository<Material> = await getTenantRepository(tentat, Material, this.getTenantDataSource);

        return await repository.find({
            where: [
                {
                  tp_mat: Not('3'),
                  sn_fora: '0',
                  tp_item: '00',
                },
                {
                  tp_mat: Not('3'),
                  sn_fora: '0',
                  tp_item: '04',
                },
              ],
        })
    }
}
