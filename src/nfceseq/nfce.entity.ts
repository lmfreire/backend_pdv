import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('nfce')
export class Nfce {

    @PrimaryColumn()
    id: string;

    @Column()
    sn_enc: string;
    
    @Column()
    nr_nfce: string;
    
    @Column()
    cd_fil: string;
    
    @Column()
    nr_serie: string;
}