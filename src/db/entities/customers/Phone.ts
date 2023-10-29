
import { BaseEntity, JoinColumn, Unique, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Customer } from "./Customer.js";
import { Profile } from "./Profile.js";


@Entity('phone')
export class Phone extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 255, nullable: false })
    PhoneNo: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    UpdatedAt: string;

    @ManyToOne(() => Profile, profile => profile.phones)
    profile: Partial<Profile>
}