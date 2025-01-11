import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { Material } from './material.entity';
import getTenantRepository from 'src/utils/get.tenant.repository';
import { Kititens } from './material.entity copy';

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

        return await repository.query(`
            SELECT
              material.cd_mat,
              material.nm_mat,
              material.nm_unid,
              material.nr_ref,
              material.vl_unit,
              material.vl_prazo,
              material.tp_mat,
              material.sn_fora,
              material.tp_item,
              material.cd_gtin
          FROM
              material
          WHERE
              tp_mat != '3' 
              AND material.sn_fora = '0'
              AND( material.tp_item = '00' OR material.tp_item = '04')

          UNION ALL

          SELECT
              grade.cd_similar AS cd_mat,
              material.nm_mat,
              grade.un_prod AS nm_unid,
              material.nr_ref,
              grade.vl_unit,
              grade.vl_prazo,
              material.tp_mat,
              material.sn_fora,
              material.tp_item,
              grade.cd_gtin
          FROM
              grade
          LEFT JOIN material ON grade.cd_mat = material.cd_mat
          WHERE
              tp_mat != '3' 
              AND material.sn_fora = '0'
              AND( material.tp_item = '00' OR material.tp_item = '04') 
          `)      
    }
    async getProdutoPorCodSimilar(tentat: string, cd_similar: string){
        const repository: Repository<Material> = await getTenantRepository(tentat, Material, this.getTenantDataSource);

        return await repository.query(`
            SELECT 
                material.nm_mat, grade.vl_prazo, material.cd_cfop1, material.cd_sita, material.cd_sitb, material.cd_pis, material.cd_cofins, material.sn_fora, grade.cd_mat 
            FROM 
                grade 
            LEFT JOIN material ON material.cd_mat = grade.cd_mat 
            WHERE 
                grade.cd_similar = ${cd_similar}
          `)      
    }

    async getMaterialByCdMat(tentat: string, cd_mat: string){
        const repository: Repository<Material> = await getTenantRepository(tentat, Material, this.getTenantDataSource);

        const result =  await repository.find({
            where: {
                cd_mat
            }
        })

        
        return result
    }

    async getKitByCdKit(tentat: string, cd_kit: string){
        const repository: Repository<Kititens> = await getTenantRepository(tentat, Kititens, this.getTenantDataSource);

        return await repository.query(`
            SELECT
				kititens.cd_mat,
				kititens.qt_prod,
				kititens.vl_unit,
				material.nm_unid,
				material.nm_mat,
				material.cd_cfop1,
				material.cd_sita,
				material.cd_sitb,
				material.cd_pis,
				material.cd_cofins,
				material.sn_fora
			FROM 
				kititens
			LEFT JOIN material ON kititens.cd_mat = material.cd_mat
			WHERE 
				kititens.cd_kit = ${cd_kit}
          `)      
    }
}
