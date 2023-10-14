import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminNS } from '../../../@types/type_admin';


@Entity('admin')
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: AdminNS.Admin

    @Column()
    userName: AdminNS.Admin;

    @Column()
    displayName: AdminNS.Admin;

    @Column()
    email: AdminNS.Admin;

    @Column()
    password: AdminNS.Admin;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    revDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    UpdatedAt: string;
}