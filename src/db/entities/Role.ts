import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinTable,
    ManyToMany
}
    from "typeorm";
import { Customer } from "./customers/Customer.js";
import { Permission } from "./Permission.js";

// import { Permission } from "./Permission.js";
// import { Customer } from "./customers/Customer.js";

@Entity('role')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    name: string;

    // @ManyToMany(() => Permission, { cascade: true, eager: true })
    // @JoinTable()
    // permissions: Permission[];

    @OneToMany(() => Customer, customer => customer.roles)
    customers: Customer[];
}