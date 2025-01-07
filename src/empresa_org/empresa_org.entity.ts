import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('empresa')
export class Empresa_org {

    @PrimaryColumn()
    cd_loja: string;

    @Column()
    sn_vend: string;

    @Column()
    sn_estoque: string;
}