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
}