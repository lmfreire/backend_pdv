import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Estoque } from './estoque.entity';
import getTenantRepository from '../utils/get.tenant.repository';
import { Result } from '../utils/result';
import { HttpError } from '../utils/httpError';

@Injectable()
export class EstoqueService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async getProdutoEstoque(tentat: string, data: {cd_mat: string, cd_fil: string, cd_arm: string}){
        const repository: Repository<Estoque> = await getTenantRepository(tentat, Estoque, this.getTenantDataSource);

        const result = await repository.findOne({where: {
            cd_mat: data.cd_mat,
            cd_fil: data.cd_fil,
            cd_arm: data.cd_arm
        }});

        if (result && result.sn_inventario == '1') {
            return new Result(null, 
                new HttpError(`Produto: ${result.cd_mat} Bloqueado - Inventário de Estoque`, HttpStatus.CONFLICT)
            )
        }

        return new Result(result,null)
    }
}
