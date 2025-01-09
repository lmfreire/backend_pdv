import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('materialsac')
export class Materialsac {
    
    @PrimaryColumn()
    id: string;

    @Column()
    cd_mat: string;
    
    @Column()
    cd_sac: string;
    
    @Column()
    qt_sac: string;
    
    @Column()
    tp_bobina: string;
    
    @Column()
    nr_fator: string;
    
    @Column()
    cd_usu: string;
    
    @Column()
    vl_custo: string;
}