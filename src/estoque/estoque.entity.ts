import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('estoque')
export class Estoque {
    
    @PrimaryColumn()
    id: string;

    @Column()
    sn_inventario: string;

    @Column()
    cd_mat: string;
    
    @Column()
    cd_fil: string;
    
    @Column()
    cd_arm: string;
}