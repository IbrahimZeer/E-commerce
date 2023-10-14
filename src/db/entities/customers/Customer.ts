import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Profile } from "./Profile.js";
import { Role } from "../Role.js";
@Entity('customer')
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    fName: string;

    @Column({ length: 255, nullable: false })
    lName: string;

    @Column()
    displayName: string;

    @Column({ length: 255, nullable: false })
    email: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
    @Column({ nullable: false })
    password: string;

    @PrimaryGeneratedColumn('uuid')
    profiled: string;

    @ManyToMany(() => Role, role => role.customers, { eager: true })
    @JoinTable()
    roles: Role[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    UpdatedAt: string;

    @OneToOne(() => Profile, profile => profile.user, { eager: true })
    profile: Partial<Profile>;

}