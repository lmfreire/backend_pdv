import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('material_precos')
export class MaterialPrecos {
    
    @PrimaryColumn()
    cd_mat: string;

    @Column()
    vl_prazo: string;
}