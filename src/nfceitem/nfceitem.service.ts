import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Pvitem } from './pvitem.entity';
import getTenantRepository from '../utils/get.tenant.repository';
import { BuscaPvItemDTO, NfceItemDTO } from './pvitem.dto';
import { Material } from '../material/material.entity';
import { NfceItem } from './NfceItem.entity';
import { Nfped } from './nfped.entity';

@Injectable()
export class NfceitemService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async inserirItensPedido(tenantId: string, data : NfceItemDTO) {

        let cd_cfop = '';
        let unidade = '';
        let qt_emb = '1';
        let cd_ean = '';

        const itens: Pvitem[] = await this.buscarItemPedido(tenantId, data);

        itens.forEach(async (item : Pvitem) => {
            const repository: Repository<Material> = await getTenantRepository(tenantId, Material, this.getTenantDataSource);

            const material: Material[] = await repository.find({
                where: {
                    cd_mat: item.cd_mat
                }
            })
            
            material.forEach(mat => {

                cd_cfop = mat.cd_cfop1
                if(mat.sn_uso_nfce == '1'){
                    cd_cfop = mat.cd_cfop_nfce
                }

                cd_ean = mat.cd_gtin
                unidade = mat.nm_unid
            })

            let it = 0;

            const repositoryNfceItem: Repository<NfceItem> = await getTenantRepository(tenantId, NfceItem, this.getTenantDataSource);

            const itemMax = await repositoryNfceItem.query(`
                SELECT ifnull(max(item)+1, 1) AS max_item FROM nfceitem
                WHERE nr_serie = ${data.nr_serie}
                AND cd_fil = ${data.cd_fil}
                and nr_nfce = ${data.nr_nfce}
            `)

            if (itemMax && Number(itemMax[0].max_item) > 0) {
                it = itemMax[0].max_item;
            }
            
            await repositoryNfceItem.insert({ 
                cd_fil: data.cd_fil,
                nr_nfce: data.nr_nfce,
                nr_serie: data.nr_serie,
                item: it.toString(),
                cd_mat: item.cd_mat,
                un_prod: unidade,
                qt_prod: item.qt_ped,
                vl_unit: item.vl_preco,
                tt_item: item.vl_total,
                cd_cfop: cd_cfop,
                qt_emb: qt_emb,
                cd_ean: cd_ean,
                cd_eantrib: cd_ean,
            })

        });

        if (itens && itens.length > 0 ) {
            const repositoryNfped: Repository<Nfped> = await getTenantRepository(tenantId, Nfped, this.getTenantDataSource);

            //Inserir Pedido 
            const resultNfped = await repositoryNfped.insert({
                cd_fil: data.cd_fil,
                nr_nf: data.nr_nf,
                nr_serie: data.nr_serie,
                nr_ped: data.nr_ped,
                cd_modelo: data.cd_modelo,
            })

            // console.log(resultNfped);
        }
    }

    async buscarItemPedido(tentat: string, data : BuscaPvItemDTO) : Promise<Pvitem[]> {
        const repository: Repository<Pvitem> = await getTenantRepository(tentat, Pvitem, this.getTenantDataSource);

        const res: Pvitem[] = await repository.find({
            where: {
                nr_pv: data.nr_pv,
                cd_fil: data.cd_fil
            }
        })

        return res
    }
}
