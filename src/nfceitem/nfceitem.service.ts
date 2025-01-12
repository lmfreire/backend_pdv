import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Pvitem } from './pvitem.entity';
import getTenantRepository from '../utils/get.tenant.repository';
import { BuscaPvItemDTO, NfceItemDTO } from './pvitem.dto';
import { Material } from '../material/material.entity';
import { NfceItem } from './NfceItem.entity';
import { Nfped } from './nfped.entity';
import { KitItensDTO, MaterialProdutoDTO, ProdutoDTO } from './produto.dto';
import { Grade } from '../material/grade.entity';
import { Kititens } from '../material/material.entity copy';

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


    async inserirItens(tentatId: string, data: ProdutoDTO){
        //const repository: Repository<Pvitem> = await getTenantRepository(tentat, Pvitem, this.getTenantDataSource);

        let qt_emb = '1';
        let cd_cfop = '';
        let cd_ean = '';
        let cd_eantrib = '';
        let cdmat = data.cd_mat;
        let cdsimilar = '';
        let unidade = '';
        let sn_kit = 0;

        const material: MaterialProdutoDTO = await this.buscarMaterial(tentatId, data.cd_gtin)

        if(material){
            cd_cfop = material.cd_cfop1
            if(material.sn_uso_nfce == '1'){
                cd_cfop = material.cd_cfop_nfce
            }
            cd_ean = material.cd_gtin_grade
            cd_eantrib = material.cd_gtin
            qt_emb = material.qt_emb
            cdmat = material.cd_mat
            cdsimilar = material.cd_similar
            unidade = material.un_prod
        }else {
            const materialFinal = await this.buscaMaterialProdFinal(tentatId, cdmat)

            if(materialFinal){
                cd_cfop = materialFinal.cd_cfop1
                if(materialFinal.sn_uso_nfce == '1'){
                    cd_cfop = materialFinal.cd_cfop_nfce
                }
                cd_ean = materialFinal.cd_gtin
                cd_eantrib = materialFinal.cd_gtin
                qt_emb = materialFinal.ft_unid
                unidade = materialFinal.nm_unid
                sn_kit = Number(materialFinal.sn_kit)
            }
        }

        if (sn_kit == 0) {
            let it = 0;

            const repositoryNfceItem: Repository<NfceItem> = await getTenantRepository(tentatId, NfceItem, this.getTenantDataSource);

            const itemMax = await repositoryNfceItem.query(`
                SELECT ifnull(max(item)+1, 1) AS max_item FROM nfceitem
                WHERE nr_serie = ${data.nr_serie}
                AND cd_fil = ${data.cd_fil}
                and nr_nfce = ${data.nr_nfce}
            `)

            if (itemMax && Number(itemMax[0].max_item) > 0) {
                it = itemMax[0].max_item;
            }

            repositoryNfceItem.insert({
                cd_fil: data.cd_fil,
                nr_nfce: data.nr_nfce,
                nr_serie: data.nr_serie,
                item: it.toString(),
                cd_mat: cdmat,
                un_prod: unidade,
                qt_prod: data.qt_prod,
                vl_unit: data.vl_unit,
                tt_item: data.tt_item,
                cd_cfop: cd_cfop,
                qt_emb: qt_emb,
                cd_ean: cd_ean,
                cd_eantrib: cd_eantrib,
            })

        } else {

            const kits: KitItensDTO[] = await this.buscarKitItens(tentatId, cdmat)

            let it = 0;
            kits.forEach(async kit => {
                const repositoryNfceItem: Repository<NfceItem> = await getTenantRepository(tentatId, NfceItem, this.getTenantDataSource);

                const itemMax = await repositoryNfceItem.query(`
                    SELECT ifnull(max(item)+1, 1) AS max_item FROM nfceitem
                    WHERE nr_serie = ${data.nr_serie}
                    AND cd_fil = ${data.cd_fil}
                    and nr_nfce = ${data.nr_nfce}
                `)

                if (itemMax && Number(itemMax[0].max_item) > 0) {
                    it = itemMax[0].max_item;
                }

                repositoryNfceItem.insert({
                    cd_fil: data.cd_fil,
                    nr_nfce: data.nr_nfce,
                    nr_serie: data.nr_serie,
                    item: it.toString(),
                    cd_mat: kit.cd_mat,
                    un_prod: kit.nm_unid,
                    qt_prod: (Number(data.qt_prod) * Number(kit.qt_prod)).toString(),
                    vl_unit: kit.vl_unit,
                    tt_item: (Number(kit.qt_prod) * Number(kit.vl_unit)).toString(),
                    cd_cfop: kit.cd_cfop1,
                    qt_emb: kit.ft_unid,
                    cd_ean: kit.cd_gtin,
                    cd_eantrib: kit.cd_gtin,
                })

                it++;
            })            
        }
        
    }

    async buscarKitItens(tentatId: string, cdmat: string){
        const repository: Repository<Kititens> = await getTenantRepository(tentatId, Kititens, this.getTenantDataSource);
        
        const res = await repository.query(`
            SELECT 
            kititens.cd_mat, 
            kititens.qt_prod, 
            kititens.vl_unit, 
            material.nm_unid, 
            material.cd_cfop1, 
            material.cd_gtin, 
            material.ft_unid, 
            material.sn_fora
            FROM kititens 
            LEFT JOIN material ON kititens.cd_mat = material.cd_mat 
            WHERE kititens.cd_kit = 0${cdmat}    
        `)

        return res
    }

    async buscaMaterialProdFinal(tentatId: string, cdmat: string){
        const repository: Repository<Material> = await getTenantRepository(tentatId, Material, this.getTenantDataSource);
        
        const res: Material = await repository.findOne({
            where: {
                cd_mat: cdmat
            }
        })

        return res
    }

    async buscarMaterial(tentatId: string, cd_gtin: string) {
        const repository: Repository<Grade> = await getTenantRepository(tentatId, Grade, this.getTenantDataSource);
        
        const res: MaterialProdutoDTO = await repository.query(`
            SELECT 
            material.cd_cfop1, 
            material.sn_uso_nfce, 
            material.cd_cfop_nfce, 
            material.cd_gtin, 
            material.cd_mat, 
            grade.qt_emb, 
            grade.cd_gtin as cd_gtin_grade, 
            grade.cd_similar, 
            grade.un_prod
            FROM grade
            LEFT JOIN material ON material.cd_mat = grade.cd_mat
            WHERE grade.cd_gtin = 0${cd_gtin}
        `)     
        
        return res[0] || null;

    }
}
