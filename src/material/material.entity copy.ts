import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('kititens')
export class Kititens {
    
    @PrimaryColumn()
    id: string;

    @Column()
    cd_mat: string;

    @Column()
    cd_kit: string;
    
    @Column()
    qt_prod: string;
    
    @Column()
    vl_unit: string;
}