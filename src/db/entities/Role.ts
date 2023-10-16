import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./Permission.js";
import { Customer } from "./customers/Customer.js";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        type: 'enum',
        enum: ['user', 'admin', 'editor'],
        default: "user",
        unique: true
    })
    name: 'user' | 'admin' | 'editor';

    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
}