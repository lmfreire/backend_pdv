import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('cfop')
export class Cfop {

    @PrimaryColumn()
    cd_cfop: string;

    @Column()
    nm_cfop: string;
}