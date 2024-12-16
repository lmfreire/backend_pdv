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
    id_paygo: string;

    @Column()
    login_ativo: string;
}