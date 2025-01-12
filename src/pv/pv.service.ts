import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import getTenantRepository from '../utils/get.tenant.repository';
import { Pv } from './pv.entity';
import { BuscaPvDTO } from './pv.dto';

@Injectable()
export class PvService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async validarNumeroPedido(tentat: string, data : BuscaPvDTO){
        const repository: Repository<Pv> = await getTenantRepository(tentat, Pv, this.getTenantDataSource);

       const res = await repository.find({
        where: {
            nr_pv: data.nr_pv,
            cd_fil: data.cd_fil,
            sn_enc: data.sn_enc,
            tp_venda: data.tp_venda
        }
       })

       return {
        "numero_valido" : res ? true : false
       }
    }

}
