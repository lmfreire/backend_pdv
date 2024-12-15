import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('sis_empresa')
export class Empresa {

    @PrimaryColumn()
    id?: number;

    @Column()
    cd_empresa: string;

    @Column()
    nm_empresa: string;

    @Column()
    conexao: string;

    @Column()
    nm_db: string;

    @Column()
    sn_ativo: string;

    @Column()
    sn_utiliza_disparador_email: number;

    @Column()
    nm_dbmobile: string;
}