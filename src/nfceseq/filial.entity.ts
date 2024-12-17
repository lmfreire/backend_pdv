import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('filial')
export class Filial {

    @PrimaryColumn()
    cd_fil: string;

    @Column()
    nm_fil: string;
}