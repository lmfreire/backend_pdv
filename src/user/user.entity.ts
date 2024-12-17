import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('sec_users')
export class User {
    
    @PrimaryColumn()
    login: string;

    @Column()
    pswd: string;

    @Column()
    priv_admin: string;

    @Column()
    active: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    cd_rep: string;
}