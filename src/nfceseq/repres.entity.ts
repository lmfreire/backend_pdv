import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('repres')
export class Repres {
    
    @PrimaryColumn()
    cd_rep: string;

    @Column()
    nm_rep: string;
}