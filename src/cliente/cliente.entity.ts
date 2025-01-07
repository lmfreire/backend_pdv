import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('cliente')
export class Cliente {

    @PrimaryColumn()
    cd_cli: string;

    @Column()
    nm_cli: string;

    @Column()
    cd_tabelaprecos: string;
}