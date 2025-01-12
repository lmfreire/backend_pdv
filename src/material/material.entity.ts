import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('material')
export class Material {
    
    @PrimaryColumn()
    cd_mat: string;

    @Column()
    nm_mat: string;

    @Column()
    nm_unid: string;
    
    @Column()
    cd_gtin: string;
    
    @Column()
    nr_ref: string;
    
    @Column()
    vl_unit: string;
    
    @Column()
    vl_prazo: string;

    @Column()
    tp_mat: string;

    @Column()
    sn_fora: string;

    @Column()
    tp_item: string;

    @Column()
    cd_cfop1: string;

    @Column()
    cd_sita: string;

    @Column()
    cd_sitb: string;

    @Column()
    cd_pis: string;

    @Column()
    cd_cofins: string;
    
    @Column()
    sn_kit: string;
    
    @Column()
    sn_uso_nfce: string;
    
    @Column()
    cd_cfop_nfce: string;
    
    @Column()
    ft_unid: string;
}