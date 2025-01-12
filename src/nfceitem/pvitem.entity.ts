import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('pvitem')
export class Pvitem {

    @PrimaryColumn()
    id: string;

    @Column()
    cd_mat: string;
    
    @Column()
    qt_ped: string;
    
    @Column()
    vl_preco: string;
    
    @Column()
    vl_total: string;
    
    @Column()
    nr_pv: string;
    
    @Column()
    cd_fil: string;
}