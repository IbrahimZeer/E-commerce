
import { BaseEntity, JoinColumn, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Customer } from "./Customer.js";
import { Profile } from "./Profile.js";


@Entity('phone')
export class Phone extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    PhoneNo: string;

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

    @ManyToOne(() => Profile, profile => profile.phones)
    profile: Profile
}