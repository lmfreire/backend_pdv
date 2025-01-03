import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('nfceseq')
export class Nfceseq {
    
    @PrimaryColumn()
    id: string;

    @Column()
    cd_fil: string;

    @Column()
    sn_ativo: string;

    @Column()
    nr_serie: string;
    
    @Column()
    nr_nfce: string;

    @Column()
    id_paygo: string;

    @Column()
    login_ativo: string;

    @Column()
    cd_rep: string;
}