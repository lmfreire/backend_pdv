import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('nfceitem')
export class NfceItem {

    @PrimaryColumn()
    id: string;

    @Column()
    item: string;
    
    @Column()
    cd_fil: string;
    
    @Column()
    nr_nfce: string;
    
    @Column()
    nr_serie: string;
    
    @Column()
    cd_mat: string;
    
    @Column()
    un_prod: string;
    
    @Column()
    qt_prod: string;
    
    @Column()
    vl_unit: string;
    
    @Column()
    tt_item: string;
    
    @Column()
    cd_cfop: string;
    
    @Column()
    qt_emb: string;
    
    @Column()
    cd_ean: string;
    
    @Column()
    cd_eantrib: string;
}