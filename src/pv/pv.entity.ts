import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('pv')
export class Pv {

    @PrimaryColumn()
    id: string;

    @Column()
    nr_pv: string;
    
    @Column()
    cd_fil: string;
    
    @Column()
    sn_enc: string;
    
    @Column()
    tp_venda: string;
}