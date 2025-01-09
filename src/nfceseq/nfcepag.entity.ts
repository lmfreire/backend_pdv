import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('nfcepag')
export class Nfcepag {
    
    @PrimaryColumn()
    id: string;

    @Column()
    nr_nfce: string;

    @Column()
    cd_fil: string;

    @Column()
    nr_serie: string;
}