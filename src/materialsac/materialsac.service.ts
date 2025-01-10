import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Materialsac } from './materialsac.entity';
import getTenantRepository from '../utils/get.tenant.repository';
import { Estoque } from '../estoque/estoque.entity';
import { Result } from '../utils/result';
import { HttpError } from '../utils/httpError';

@Injectable()
export class MaterialsacService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async materiaisComposicao(tentat: string, data: {cd_mat: string, cd_fil: string, cd_arm: string}){
        const repository: Repository<Materialsac> = await getTenantRepository(tentat, Materialsac, this.getTenantDataSource);

        const res: Materialsac[] =  await repository.find({
            where: {
                cd_mat: data.cd_mat
            }
        });

        res.forEach(async (item : Materialsac) => {
            const repository: Repository<Estoque> = await getTenantRepository(tentat, Estoque, this.getTenantDataSource);
            
            const estoque: Estoque = await repository.findOne({
                where: {
                    cd_mat: item.cd_sac,
                    cd_fil: data.cd_fil,
                    cd_arm: data.cd_arm
                }
            })
            
            if(estoque && estoque.sn_inventario == '1'){
                return new Result(null, 
                    new HttpError(`Produto de Composição: ${item.cd_sac} Bloqueado - Inventário de Estoque`, HttpStatus.CONFLICT)
                )
            }
        })

        

        return new Result(res,null)
    }
}
