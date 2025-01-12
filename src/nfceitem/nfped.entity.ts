import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('nfped')
export class Nfped {

    @PrimaryColumn()
    id: string;

    @Column()
    cd_fil: string;
    
    @Column()
    nr_nf: string;
    
    @Column()
    nr_serie: string;
    
    @Column()
    nr_ped: string;
    
    @Column()
    cd_modelo: string;
}